package com.vti.service;

import com.vti.repository.PasswordTokenRepository;
import com.vti.entity.PasswordResetToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordTokenService implements IPasswordTokenService {
	@Autowired
	private PasswordTokenRepository passwordTokenRepository;

	@Override
	public void createNewPasswordToken(PasswordResetToken passwordResetToken) {
		passwordTokenRepository.save(passwordResetToken);
	}
}
