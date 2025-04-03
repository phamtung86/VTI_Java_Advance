package com.vti.service;

import com.vti.dto.AccountDTO;
import com.vti.entity.Account;
import com.vti.form.account.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface IAccountService  {
    int totalAccount();

    List<Account> getAccounts();

    AccountDTO findAccountById(Integer id);

    List<AccountDTO> findListAccountById(List<Integer> ids);

    Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm filterForm);

    Account findByUsername(String username);

    void deleteAccounts(Set<Integer> idList);

    void createAccount(CreatingAccountForAdminCreateForm form);

    void updateAccount(UpdatingAccountForm form);

    int getCountIdForDelete(Set<Integer> ids);

    boolean isAccountExistsByID(Integer id);

    boolean isAccountExistsByUsername(String username);

    boolean registerAccount(CreatingAccountForRegistrationForm form);
    
    Account findAccountByUserName(String userName);

    Account findAccountByEmail(String email);

    Optional<Account> getAccountByPasswordResetToken(String token);

    void changeUserPassword(Account account, String password);

    void updatePassword(UpdatingAccountPasswordForm form);

    void activateAccount(String token);

    void editAccount(String userName,EditProfileForm editProfileForm) throws IOException;
}
