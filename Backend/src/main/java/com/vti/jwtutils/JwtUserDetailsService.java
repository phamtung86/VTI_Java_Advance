package com.vti.jwtutils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vti.service.IAccountService;
import com.vti.entity.Account;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private IAccountService accountService;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account a = accountService.findAccountByUserName(username);
        if (a == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        } else {
            return new CustomUserDetails(a.getUsername(), a.getPassword(), AuthorityUtils.createAuthorityList(a.getRole().toString()), a.getId(),a.getFirstName(),a.getLastName(), a.getRole().toString(), a.getProfileImage());
        }
    }
}
