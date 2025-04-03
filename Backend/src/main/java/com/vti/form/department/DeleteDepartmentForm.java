package com.vti.form.department;

import com.vti.validation.department.DepartmentIDListExists;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class DeleteDepartmentForm {

	@NotEmpty(message = "{Department.createDepartment.form.id.NotBlank}")
	@DepartmentIDListExists
	private Set<Integer> ids;
	
}

