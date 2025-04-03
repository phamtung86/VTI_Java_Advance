package com.vti.form.account;

import com.vti.validation.department.DepartmentIDExists;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingAccountForAdminCreateForm extends CreatingAccountForm {
	
	private String password = "123456"; // Set default password

	@NotBlank(message = "{Account.createAccount.form.role.NotBlank}")
	@Pattern(regexp = "ADMIN|EMPLOYEE|MANAGER", message = "{Account.createAccount.form.role.pattern}")
	private String role;

	@NotNull(message = "{Account.createAccount.form.departmentId.NotBlank}")
	@DepartmentIDExists(message = "{Account.createAccount.form.departmentId.NotExists}")
	private Integer departmentId;

}

