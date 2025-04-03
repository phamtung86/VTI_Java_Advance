package com.vti.form.department;

import com.vti.entity.Department;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
public class DepartmentFilterForm {
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date minCreatedDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date maxCreatedDate;


}

