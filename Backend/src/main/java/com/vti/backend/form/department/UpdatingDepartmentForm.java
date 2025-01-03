package com.vti.backend.form.department;

import com.vti.backend.validation.department.DepartmentIDExists;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingDepartmentForm {

	@NotBlank(message = "{Department.createDepartment.form.id.NotBlank}")
	@DepartmentIDExists(message = "{Department.createDepartment.form.departmentId.NotExists}")
	private int id;

	@NotBlank(message = "{Department.createDepartment.form.type.NotBlank}")
	@Pattern(regexp = "DEV|TEST|PM|ScrumMaster", message = "{Department.createDepartment.form.type.pattern}")
	private String type;


}
