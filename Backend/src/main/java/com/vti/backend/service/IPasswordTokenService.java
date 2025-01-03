package com.vti.backend.service;

import com.vti.entity.PasswordResetToken;

public interface IPasswordTokenService {
	void createNewPasswordToken(PasswordResetToken passwordResetToken);
}
