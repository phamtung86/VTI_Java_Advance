package com.vti.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
public class DepartmentDTO {
    private Integer id;

    private String name;

    private int totalMember;

    private Timestamp createdDate;

    private List<AccountDTO> accounts;
}
