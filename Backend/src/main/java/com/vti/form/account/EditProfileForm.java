package com.vti.form.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditProfileForm {
    private String firstName;
    private String lastName;
    private String email;
    private MultipartFile profileImage;
}
