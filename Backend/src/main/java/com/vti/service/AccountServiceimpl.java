package com.vti.service;

import com.vti.dto.AccountDTO;
import com.vti.entity.Account;
import com.vti.entity.AccountActiveToken;
import com.vti.entity.Department;
import com.vti.entity.PasswordResetToken;
import com.vti.form.account.*;
import com.vti.repository.AccountRepository;
import com.vti.repository.DepartmentRepository;
import com.vti.repository.PasswordTokenRepository;
import com.vti.specification.AccountSpecification;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AccountServiceimpl implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IAccountActiveTokenService accountActiveTokenService;

    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

    @Autowired
    private IImageService imageService;

    @Override
    public int totalAccount() {
        return accountRepository.totalAccount();
    }

    @Override
    public List<Account> getAccounts() {
        Specification<Account> where = AccountSpecification.buildWhere("IS_NULL_ID");
        List<Account> accounts = accountRepository.findAll(where);
        for (Account account : accounts) {
            if (!account.getPassword().isEmpty()) {
                account.setPassword(null);
            }
        }
        return accounts;
    }

    @Override
    public AccountDTO findAccountById(Integer id) {
        Account account = accountRepository.findById(id).orElse(null);
        if (account == null) {
            return null;
        }
        account.setPassword(null);
        return modelMapper.map(account, AccountDTO.class);
    }

    @Override
    public List<AccountDTO> findListAccountById(List<Integer> ids) {
        List<Account> accounts = new ArrayList<>();
        for (Integer id : ids) {
            Account account = accountRepository.findById(id).orElseThrow(() ->
                    new IllegalArgumentException("Account not found for id: " + id));
            if (!account.getPassword().isEmpty()) {
                account.setPassword(null);
            }
            accounts.add(account);
        }

        List<AccountDTO> dtos = modelMapper.map(accounts, new TypeToken<List<AccountDTO>>() {}.getType());
        return dtos;
    }

    public Page<Account> getAllAccounts(
            Pageable pageable,
            String search,
            AccountFilterForm filterForm) {

        Specification<Account> where = AccountSpecification.buildWhere(search, filterForm,"FILTER_ACCOUNT");
        return accountRepository.findAll(where, pageable);
    }

    @Override
    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Transactional
    public void updateAccount(UpdatingAccountForm form) {
        // convert form to entity
        Account account = modelMapper.map(form, Account.class);

        // get Account by id
        Account acc = accountRepository.findById(account.getId()).orElseThrow(() ->
                new IllegalArgumentException("Account not found for id: " + account.getId()));
        acc.setRole(account.getRole());
        acc.setDepartment(account.getDepartment());
        accountRepository.save(acc);

        // Check for department change
        if (acc.getDepartment() != null) {
            Integer beforDepartmentId = acc.getDepartment().getId();
            Integer afterDepartmentId = form.getDepartmentId();

            if (!beforDepartmentId.equals(afterDepartmentId)) {
                updateDepartmentMemberCount(beforDepartmentId, -1);
                updateDepartmentMemberCount(afterDepartmentId, 1);
            }
        }
    }

    private void updateDepartmentMemberCount(Integer departmentId, int delta) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new IllegalArgumentException("Department not found for id: " + departmentId));
        department.setTotalMember(department.getTotalMember() + delta);
        departmentRepository.save(department);
    }

    @Override
    public int getCountIdForDelete(Set<Integer> ids) {
        return accountRepository.getCountIdForDelete(ids);
    }

    @Override
    public boolean isAccountExistsByID(Integer id) {
        return accountRepository.existsById(id);
    }

    @Override
    public boolean isAccountExistsByUsername(String username) {
        return accountRepository.existsByUsername(username);
    }

    @Override
    public boolean registerAccount(CreatingAccountForRegistrationForm form) {
        Account account = modelMapper.map(form, Account.class);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account.setRole(Account.Role.EMPLOYEE);
        account.setProfileImage("https://res.cloudinary.com/dspqk9rl9/image/upload/v1737165699/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL_dkutwd.jpg");
        account.setStatus(0);
        accountRepository.save(account);
        return true;

    }

    @Override
    public Account findAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public Optional<Account> getAccountByPasswordResetToken(String token) {
        PasswordResetToken passwordResetToken = passwordTokenRepository.findByToken(token);
        if (passwordResetToken != null) {
            return Optional.ofNullable(passwordResetToken.getAccount());
        }
        return Optional.empty();
    }

    @Override
    public void changeUserPassword(Account account, String password) {
        account.setPassword(passwordEncoder.encode(password));
        accountRepository.save(account);
    }

    @Override
    public void updatePassword(UpdatingAccountPasswordForm form) {
        Account account = modelMapper.map(form, Account.class);
        Account ac = accountRepository.findByUsername(account.getUsername());

        // So sánh mật khẩu cũ
        if (passwordEncoder.matches(form.getOldPassword(), ac.getPassword())) {
            // Cập nhật mật khẩu mới
            ac.setPassword(passwordEncoder.encode(form.getPassword()));
            accountRepository.save(ac);

        } else {
            throw new IllegalArgumentException("Old password is incorrect!");
        }
    }

    @Override
    public void activateAccount(String token) {
        AccountActiveToken accountActiveToken = accountActiveTokenService.getAccountActiveTokenByToken(token);
        if(accountActiveToken != null){
            Account account = accountActiveToken.getAccount();
            if(account.getStatus() == 0){
                account.setStatus(1);
                accountRepository.save(account);
            }
        }
    }

    @Override
    public void editAccount(String userName, EditProfileForm editProfileForm) throws IOException {
        Account account =  accountRepository.findByUsername(userName);

        if(account != null){
            account.setFirstName(editProfileForm.getFirstName());
            account.setLastName(editProfileForm.getLastName());
            account.setEmail(editProfileForm.getEmail());
            if(editProfileForm.getProfileImage() != null){
                String urlImage = imageService.uploadFile(editProfileForm.getProfileImage());
                account.setProfileImage(urlImage);
            }
        }

        accountRepository.save(account);
    }


    @Override
    public void deleteAccounts(Set<Integer> idList) {
        List<Account> accounts = accountRepository.getListAccountByListId(idList);
        List<Department> departmentEntities = new ArrayList<>();
        for (Account account : accounts) {
            if (account.getDepartment() != null) {
                Department department = account.getDepartment();
                department.setTotalMember(department.getTotalMember() - 1);
                departmentEntities.add(department);
            }
        }
        accountRepository.deleteAllById(idList);
        departmentRepository.saveAll(departmentEntities);
    }

    @Override
    @Transactional
    public void createAccount(CreatingAccountForAdminCreateForm form) {
        Account account = modelMapper.map(form, Account.class);
        account.setProfileImage("https://res.cloudinary.com/dspqk9rl9/image/upload/v1737165699/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL_dkutwd.jpg");
        if (account.getCreateDate() == null) {
            account.setCreateDate(new Timestamp(System.currentTimeMillis()));
        }
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account.setStatus(1);
        accountRepository.save(account);
        Integer departmentId = account.getDepartment().getId();
        updateDepartmentMemberCount(departmentId, 1);
    }

	@Override
	public Account findAccountByUserName(String userName) {
		
		return accountRepository.findByUsername(userName);
	}
}

