package com.vti.jwtutils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
@Setter
public class CustomUserDetails extends User {

    private static final long serialVersionUID = 1L;
    private Integer userId;
    private String firstName;
    private String lastName;
    private String fullName;
    private String role;
    private String profilePicture;
    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities,
                             Integer userId, String firstName, String lastName, String role, String profilePicture) {
        super(username, password, authorities);
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = this.firstName +" "+ this.lastName;
        this.role = role;
        this.profilePicture = profilePicture;
    }


}
