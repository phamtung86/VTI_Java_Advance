package com.vti.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RolesDTO {
    private String roleValue;

    private String roleName;

    public RolesDTO(String roleValue, String roleName) {
        super();
        this.roleValue = roleValue;
        this.roleName = roleName;
    }
}
