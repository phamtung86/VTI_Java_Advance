package com.vti.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class AccountDTO {

    private Integer id;

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String fullName;

    private String role;

    private String email;

    private String profileImage;

    private String departmentName;

    private Integer departmentId;

    private Timestamp createDate;
}
