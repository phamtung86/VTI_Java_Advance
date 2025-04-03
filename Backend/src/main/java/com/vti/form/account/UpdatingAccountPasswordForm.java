package com.vti.form.account;

import com.vti.validation.account.AccountUsernameExists;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@NoArgsConstructor
public class UpdatingAccountPasswordForm {

	@NotNull(message = "{Account.createAccount.form.id.NotBlank}")
	@AccountUsernameExists(message = "{Account.createAccount.form.username.NotExists}")
	private String username;

	@NotBlank(message = "{Account.createAccount.form.password.NotBlank}")
//	@Length(min=8, message = "{Account.createAccount.form.password.LengthRange}")
	private String oldPassword;

	@NotBlank(message = "{Account.createAccount.form.password.NotBlank}")
	@Length(min=8, message = "{Account.createAccount.form.password.LengthRange}")
	private String password;
	
}

