package com.vti.mail;

import com.vti.entity.Account;
import com.vti.entity.PasswordResetToken;
import org.springframework.mail.SimpleMailMessage;

import java.util.Locale;

public interface ISendMailService {
	void sendPasswordResetEmail(String contextPath, Locale locale, String token, Account account, String endpoint, String content, String title);

	String validatePasswordResetToken(String token);

	boolean isTokenFound(PasswordResetToken passToken);

	boolean isTokenExpired(PasswordResetToken passToken);

	SimpleMailMessage constructResetTokenEmail(String contextPath, Locale locale, String token, Account account, String endpoint, String content, String title);

	SimpleMailMessage constructEmail(String subject, String body, Account account);
}
