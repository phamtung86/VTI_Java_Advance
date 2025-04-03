package com.vti.form.department;
import com.vti.validation.account.AccountIDExists;
import com.vti.validation.department.DepartmentNameNotExists;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Data
@NoArgsConstructor
public class CreatingDepartmentForm {

	@NotBlank(message = "{Department.createDepartment.form.name.NotBlank}")
	@Length(max = 30, message = "{Department.createDepartment.form.name.Length}")
	@DepartmentNameNotExists(message = "{Department.createDepartment.form.name.NotExists}")
	private String name;

	private List<Account> accounts;

	@Data
	@NoArgsConstructor
	public static class Account {
		
		@NotNull(message = "{Account.createAccount.form.id.NotBlank}")
		@AccountIDExists(message = "{Account.createAccount.form.id.Exists}")
		private Integer id;
		
	}
}
