package com.vti.backend.service;

import com.vti.backend.dto.AccountDTO;
import com.vti.backend.form.account.*;
import com.vti.entity.Account;
import com.vti.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface IAccountService extends UserDetailsService {
    int totalAccount();

    List<Account> getAccounts();

    List<AccountDTO> findAccountById(List<Integer> ids);

    void updateDepartmentAccount(int id, Department department);

    Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm filterForm);

    Account findByUsername(String username);

    void deleteAccounts(Set<Integer> idList);

    void createAccount(CreatingAccountForAdminCreateForm form);

    void updateAccount(UpdatingAccountForm form);

    int getCountIdForDelete(Set<Integer> ids);

    boolean isAccountExistsByID(Integer id);

    boolean isAccountExistsByUsername(String username);

    void registerAccount(CreatingAccountForRegistrationForm form);

    // find user by email
    Account findAccountByEmail(String email);

    Optional<Account> getAccountByPasswordResetToken(String token);

    void changeUserPassword(Account account, String password);

    void updatePassword(UpdatingAccountPasswordForm form);
}
