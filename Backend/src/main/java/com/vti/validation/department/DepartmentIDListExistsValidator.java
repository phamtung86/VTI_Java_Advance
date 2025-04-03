package com.vti.validation.department;

import com.vti.service.IDepartmentService;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

public class DepartmentIDListExistsValidator implements ConstraintValidator<DepartmentIDListExists, Set<Integer>> {

	@Autowired
	private IDepartmentService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Set<Integer> ids, ConstraintValidatorContext constraintValidatorContext) {

		if (StringUtils.isEmpty(ids.toString())) {
			return true;
		}
		
		int countRecort = service.getCountIdForDelete(ids);
		
		if(countRecort != ids.size()) {
			return false;
		} 
		
		return true;
	}
}

