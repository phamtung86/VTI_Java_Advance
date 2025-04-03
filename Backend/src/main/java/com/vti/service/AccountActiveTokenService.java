package com.vti.service;

import com.vti.entity.AccountActiveToken;
import com.vti.repository.AccountActiveTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountActiveTokenService implements IAccountActiveTokenService{

    @Autowired
    private AccountActiveTokenRepository accountActiveTokenRepository;

    @Override
    public void createAccountActiveToken(AccountActiveToken accountActiveToken) {
        accountActiveTokenRepository.save(accountActiveToken);
    }

    @Override
    public AccountActiveToken getAccountActiveTokenByToken(String token) {
        return accountActiveTokenRepository.findByToken(token);
    }
}
