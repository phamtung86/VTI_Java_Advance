package com.vti.backend.controller;

import com.vti.backend.dto.LoginInfoDTO;
import com.vti.backend.service.IAccountService;
import com.vti.entity.Account;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    @Autowired
    private IAccountService accountService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/login")
    public LoginInfoDTO login(Principal principal) {

        String username = principal.getName();
        Account entity = accountService.findByUsername(username);

        // convert entity --> dto
        LoginInfoDTO dto = modelMapper.map(entity, LoginInfoDTO.class);

        return dto;
    }
}
