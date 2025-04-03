package com.vti.controller;

import com.vti.dto.AccountDTO;
import com.vti.dto.RolesDTO;
import com.vti.entity.Account;
import com.vti.entity.AccountActiveToken;
import com.vti.entity.PasswordResetToken;
import com.vti.form.account.*;
import com.vti.mail.GenericResponse;
import com.vti.mail.ISendMailService;
import com.vti.service.IAccountActiveTokenService;
import com.vti.service.IAccountService;
import com.vti.service.IPasswordTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.expression.AccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;

import static com.vti.entity.PasswordResetToken.EXPIRATION;

@RestController
@RequestMapping("/api/v1/accounts")
@Validated
public class AccountController {
    @Autowired
    private IAccountService accountService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IPasswordTokenService passwordResetToken;

    @Autowired
    private ISendMailService sendMailService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private IAccountActiveTokenService accountActiveTokenService;

    @Qualifier("messageSource")
    @Autowired
    private MessageSource messages;

    @GetMapping
    public List<AccountDTO> getAccounts() {
        List<Account> accounts = accountService.getAccounts();
        List<AccountDTO> accountDTOs = modelMapper.map(accounts, new TypeToken<List<AccountDTO>>() {
        }.getType());
        return accountDTOs;
    }

    @GetMapping("/quantity")
    public int getAccountQuantity() {
        return accountService.totalAccount();
    }

    @GetMapping("/ids")
    public List<AccountDTO> getListAccountById(@RequestParam List<Integer> ids) {
        List<AccountDTO> accounts = accountService.findListAccountById(ids);
        return accounts;
    }

    @GetMapping("/id/{id}")
    public AccountDTO getAccountById(@PathVariable(value = "id") Integer id) {
        return accountService.findAccountById(id);
    }

    @GetMapping("/page")
    public Page<AccountDTO> getAccountPage(Pageable pageable,
                                           @RequestParam(value = "search", required = false) String search, AccountFilterForm filterForm) {
        Page<Account> entityPages = accountService.getAllAccounts(pageable, search, filterForm);
        // convert entities --> dtos
        List<AccountDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<AccountDTO>>() {
        }.getType());

        Page<AccountDTO> dtoPages = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

        return dtoPages;
    }

    @PutMapping
    public void updateAccount(@RequestBody @Valid UpdatingAccountForm form) {
        accountService.updateAccount(form);
    }

    @DeleteMapping()
    public void deleteAccount(@RequestBody @Valid DeleteAccountForm form) {
        accountService.deleteAccounts(form.getIds());
    }

    @PostMapping
    public void createAccount(@RequestBody @Valid CreatingAccountForAdminCreateForm form) {
        accountService.createAccount(form);
    }

    @GetMapping(value = "/roles")
    public List<RolesDTO> getRoles() {

        List<RolesDTO> listRoles = new ArrayList<>();
        // Lấy ra tất cả các phần tử của Enum.
        Account.Role[] allRoles = Account.Role.values();
        for (Account.Role role : allRoles) {
            RolesDTO dto = new RolesDTO(role.toString(), role.toString());
            listRoles.add(dto);
        }
        return listRoles;
    }

    @Transactional
    @PostMapping("/register")
    public GenericResponse registerAccount(HttpServletRequest request, @RequestBody @Valid CreatingAccountForRegistrationForm form)  {
        boolean isSuccess = accountService.registerAccount(form);
        if (isSuccess) {
            Account account = accountService.findByUsername(form.getUsername());
            AccountActiveToken token = new AccountActiveToken();
            token.setToken(UUID.randomUUID().toString());
            token.setAccount(account);
            Timestamp now = new Timestamp(System.currentTimeMillis());
            Timestamp expiryDate = new Timestamp(now.getTime() + (EXPIRATION * 60 * 1000)); // 24 giờ
            token.setExpiryDate(expiryDate);
            token.setCreatedAt(now);

            // Lưu token vào cơ sở dữ liệu
            accountActiveTokenService.createAccountActiveToken(token);
            // Gửi email chứa token reset mật khẩu
            SimpleMailMessage mail = sendMailService.constructResetTokenEmail("http://localhost:3000", request.getLocale(),
                    token.getToken(), account, "/active-account?token=", "Vui lòng click vào đường link để kích hoạt tài khoản", "Active Account");
            mailSender.send(mail);
            // Trả về thông báo thành công
            String message = messages.getMessage("message.resetPassword", null, "Please check your email to active account!",
                    request.getLocale());
            return new GenericResponse(message);
        }
        String message = messages.getMessage("account.message.register.error", null, "Error",
                request.getLocale());
        return new GenericResponse(message);
    }

    @PostMapping("/resetPassword")
    public GenericResponse resetPassword(HttpServletRequest request, @RequestParam("email") String userEmail) throws AccessException {
        Account account = accountService.findAccountByEmail(userEmail);
        if (account == null) {
            throw new AccessException("No account found with email: " + userEmail);
        }

        // Tạo token mới và thiết lập thời gian hết hạn
        PasswordResetToken token = new PasswordResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setAccount(account);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        Timestamp expiryDate = new Timestamp(now.getTime() + (EXPIRATION * 60 * 1000)); // 24 giờ
        token.setExpiryDate(expiryDate);
        token.setCreatedAt(now);

        // Lưu token vào cơ sở dữ liệu
        passwordResetToken.createNewPasswordToken(token);

        // Gửi email chứa token reset mật khẩu
        SimpleMailMessage mail = sendMailService.constructResetTokenEmail("http://localhost:3000", request.getLocale(),
                token.getToken(), account, "/change-password?token=", "Vui lòng click vào đường link dưới đây để khôi phục mật khẩu", "Reset Password");
        mailSender.send(mail);

        // Trả về thông báo thành công
        String message = messages.getMessage("message.resetPassword", null, "Please check your email to reset password!",
                request.getLocale());
        return new GenericResponse(message);
    }

    @GetMapping("/change-password")
    public ResponseEntity<?> showChangePasswordPage(Locale locale, @RequestParam("token") String token) {
        String result = sendMailService.validatePasswordResetToken(token);
        if (result != null) {
            String message = messages.getMessage("auth.message." + result, null, locale);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponse(message));
        }
        return ResponseEntity.ok(new GenericResponse("Valid Token"));
    }

    @PostMapping("/savePassword")
    public GenericResponse savePassword(final Locale locale, @RequestBody @Valid UpdatePasswordForm form) {
        String result = sendMailService.validatePasswordResetToken(form.getToken());
        if (result != null) {
            String message = messages.getMessage("message.resetPassword", null, "Lỗi trong quá trình đặt lại mật khẩu",
                    locale);
            return new GenericResponse(message);
        }

        Optional<Account> account = accountService.getAccountByPasswordResetToken(form.getToken());
        if (account.isPresent()) {
            accountService.changeUserPassword(account.get(), form.getNewPassword());
            return new GenericResponse(
                    messages.getMessage("message.resetPasswordSuc", null, "Thay đổi mật khẩu thành công", locale));
        } else {
            return new GenericResponse(messages.getMessage("auth.message.invalid", null, locale));
        }
    }

    @PutMapping("/update-password/username/{username}")
    public void updatePassword(@PathVariable String username, @RequestBody UpdatingAccountPasswordForm form) {
        form.setUsername(username);
        accountService.updatePassword(form);
    }

    @PostMapping("/active-account")
    public ResponseEntity<?> activateAccount(@RequestParam(name = "token") String token) {
        accountService.activateAccount(token);
        return ResponseEntity.status(200).body(new GenericResponse("Active Account"));
    }

    @PostMapping("/edit-profile/{userName}")
    public ResponseEntity<?> editProfile(@PathVariable String userName,
                                         @ModelAttribute EditProfileForm form) {
        try {
            accountService.editAccount(userName, form);
            return ResponseEntity.ok(new GenericResponse("Edit Profile Success"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new GenericResponse("Edit Profile Failed"));
        }
    }

}
