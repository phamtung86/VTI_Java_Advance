package com.vti.mail;

import com.vti.repository.PasswordTokenRepository;
import com.vti.entity.Account;
import com.vti.entity.PasswordResetToken;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class SendMailService implements ISendMailService {
	@Autowired
	private PasswordTokenRepository passwordTokenRepository;

	@Autowired
	private JavaMailSender mailSender;

    @Autowired
	private MessageSource messages;

	@Value("${support.email}")
	private String supportEmail;



	@Override
	public void sendPasswordResetEmail(String contextPath, Locale locale, String token, Account account, String endpoint, String content, String title) {
		SimpleMailMessage email = constructResetTokenEmail(contextPath, locale, token, account, endpoint, content, title);
		mailSender.send(email); // Gửi email qua JavaMailSender
	}

	@Override
	public String validatePasswordResetToken(String token) {
		PasswordResetToken passToken = passwordTokenRepository.findByToken(token);

		return !isTokenFound(passToken) ? "invalidToken" : isTokenExpired(passToken) ? "expired" : null;
	}

	@Override
	public boolean isTokenFound(PasswordResetToken passToken) {
		return passToken != null;
	}

	@Override
	public boolean isTokenExpired(PasswordResetToken passToken) {
		long currentTimeMillis = System.currentTimeMillis();
		long expiryTimeMillis = passToken.getExpiryDate().getTime();
		return expiryTimeMillis < currentTimeMillis;
	}

	@Override
	public SimpleMailMessage constructResetTokenEmail(String contextPath, Locale locale, String token, Account account, String endpoint, String content, String title) {
		if (locale == null) {
			locale = Locale.US;
		}
		String url = contextPath + endpoint + token;
		String message = messages.getMessage("message.resetPassword", null,
				content, locale);
		return constructEmail(title, message + " \r\n" + url, account);
	}

	@Override
	public SimpleMailMessage constructEmail(String subject, String body, Account account) {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setSubject(subject);
		email.setText(body);
		email.setTo(account.getEmail());
		email.setFrom(supportEmail);
		return email;
	}
}
