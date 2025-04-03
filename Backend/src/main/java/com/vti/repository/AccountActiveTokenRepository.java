package com.vti.repository;

import com.vti.entity.AccountActiveToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountActiveTokenRepository extends JpaRepository<AccountActiveToken, Integer> {
    AccountActiveToken findByToken(String token);
}
