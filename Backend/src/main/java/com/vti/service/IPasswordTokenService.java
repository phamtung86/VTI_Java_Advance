package com.vti.service;

import com.vti.entity.PasswordResetToken;

public interface IPasswordTokenService {
	void createNewPasswordToken(PasswordResetToken passwordResetToken);
}
