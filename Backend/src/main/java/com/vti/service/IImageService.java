package com.vti.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IImageService {
    String uploadFile(MultipartFile file) throws IOException;
}
