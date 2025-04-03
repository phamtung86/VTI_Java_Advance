package com.vti.config.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@AllArgsConstructor
public class ErrorResponse {


	private String message;


	private String detailMessage;
	
	private Object error;

	private Integer code;

	private String moreInformation;

}
