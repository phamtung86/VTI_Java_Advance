package com.vti.validation.department;

import com.vti.service.IDepartmentService;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class DepartmentIDExistsValidator implements ConstraintValidator<DepartmentIDExists, Integer> {

	@Autowired
	private IDepartmentService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer id, ConstraintValidatorContext constraintValidatorContext) {

		if (StringUtils.isEmpty(id.toString())) {
			return true;
		}

		return service.isDepartmentExistsByID(id);
	}
}

