package com.vti.validation.account;

import com.vti.service.IAccountService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

public class AccountIDExistsValidator implements ConstraintValidator<AccountIDExists, Integer> {

	@Autowired
	private IAccountService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer id, ConstraintValidatorContext constraintValidatorContext) {

		if (StringUtils.isEmpty(id.toString())) {
			return true;
		}

		return service.isAccountExistsByID(id);
	}
}

