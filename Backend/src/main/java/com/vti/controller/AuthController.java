package com.vti.controller;

import com.vti.dto.ErrorResponse;
import com.vti.entity.Account;
import com.vti.jwtutils.CustomUserDetails;
import com.vti.jwtutils.JwtUserDetailsService;
import com.vti.jwtutils.TokenManager;
import com.vti.models.JwtRequestModel;
import com.vti.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenManager tokenManager;
    @Autowired
    private IAccountService accountService;

    @PostMapping("/login")
    public ResponseEntity<?> createToken(@RequestBody JwtRequestModel request) {
        Account account = accountService.findByUsername(request.getUsername());

        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Account does not exist"));
        }

        if (account.getStatus() == 0) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Account not active, please check your email"));
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse("User is disabled"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid username or password"));
        }

        final CustomUserDetails userDetails = jwtUserDetailsService.loadUserByUsername(request.getUsername());
        final String jwtToken = tokenManager.generateToken(userDetails);
        return ResponseEntity.ok(Map.of(
                "token", jwtToken,
                "user", Map.of(
                        "id", userDetails.getUserId(),
                        "username", userDetails.getUsername(),
                        "fullName", userDetails.getFullName(),
                        "role", userDetails.getRole(),
                        "profilePicture", userDetails.getProfilePicture()
                )
        ));
    }

    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String username = tokenManager.getUsernameFromToken(token);
            UserDetails user = jwtUserDetailsService.loadUserByUsername(username);

            if (username == null || !tokenManager.validateJwtToken(token,user)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            return ResponseEntity.status(200).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token verification failed");
        }
    }
}
