package com.vti.form.account;

import com.vti.validation.account.AccountIDExists;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingAccountForm {

    @NotNull(message = "{Account.createAccount.form.id.NotBlank}")
    @AccountIDExists(message = "{Account.createAccount.form.id.Exists}")
    private Integer id;

    @NotBlank(message = "{Account.createAccount.form.role.NotBlank}")
    @Pattern(regexp = "ADMIN|EMPLOYEE|MANAGER", message = "{Account.createAccount.form.role.pattern}")
    private String role;

    private Integer departmentId;

}

