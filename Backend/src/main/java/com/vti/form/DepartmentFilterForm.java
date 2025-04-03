package com.vti.form;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
public class DepartmentFilterForm {
    private Integer minId;
    private Integer maxId;
    private Integer minTotalMember;
    private Integer maxTotalMember;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date minCreateDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date maxCreateDate;
    private Integer minYear;
    private Integer maxYear;
    private Integer minAccount;
    private Integer maxAccount;
}
