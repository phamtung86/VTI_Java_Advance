package com.vti.form.account;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
public class UpdatePasswordForm {
    private String oldPassword;

    @NotNull
    @NotBlank(message = "{Account.createAccount.form.token.NotBlank}")
    private String token;

    @NotBlank(message = "{Account.createAccount.form.password.NotBlank}")
    private String newPassword;
}
