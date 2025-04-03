package com.vti.form.account;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@NoArgsConstructor
public class CreatingAccountForRegistrationForm extends CreatingAccountForm {

	@NotBlank(message = "{Account.createAccount.form.email.NotBlank}")
	private String email;

	@NotBlank(message = "{Account.createAccount.form.password.NotBlank}")
	@Length(min=8, message = "{Account.createAccount.form.password.LengthRange}")
	private String password;

}

