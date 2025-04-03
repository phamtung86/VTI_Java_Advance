package com.vti.form.account;

import com.vti.validation.account.AccountUsernameNotExists;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@NoArgsConstructor
public class CreatingAccountForm {
	
	@NotBlank(message = "{Account.createAccount.form.username.NotBlank}")
	@Length(min=8, max=20, message = "{Account.createAccount.form.username.LengthRange}")
	@AccountUsernameNotExists(message = "{Account.createAccount.form.username.NotExists}")
	private String username;

	@NotBlank(message = "{Account.createAccount.form.firstName.NotBlank}")
	@Length(max = 50, message = "{Account.createAccount.form.firstName.MaxLength}")
	private String firstName;

	@NotBlank(message = "{Account.createAccount.form.lastName.NotBlank}")
	@Length(max = 50, message = "{Account.createAccount.form.lastName.MaxLength}")
	private String lastName;

}

