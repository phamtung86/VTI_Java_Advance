package com.vti.form.department;

import com.vti.validation.department.DepartmentIDExists;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingDepartmentForm {

	@NotBlank(message = "{Department.createDepartment.form.id.NotBlank}")
	@DepartmentIDExists(message = "{Department.createDepartment.form.departmentId.NotExists}")
	private int id;

	private String name;


}
