package com.vti.form.account;

import java.util.Set;

import com.vti.validation.account.AccountIDListExists;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeleteAccountForm {

	@NotEmpty(message = "{Account.createAccount.form.id.NotBlank}")
	@AccountIDListExists
	private Set<Integer> ids;
	
}

