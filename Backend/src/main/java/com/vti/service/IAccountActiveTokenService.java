package com.vti.service;

import com.vti.entity.AccountActiveToken;

public interface IAccountActiveTokenService {
    void createAccountActiveToken(AccountActiveToken accountActiveToken);
    AccountActiveToken getAccountActiveTokenByToken(String token);
}
