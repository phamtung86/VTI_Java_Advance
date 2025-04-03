package com.vti.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary configKey (){
        Map<String, String> config = new HashMap();
        config.put("cloud_name", "dspqk9rl9");
        config.put("api_key", "547813551859918");
        config.put("api_secret", "2jtW5H1IMaT5wG_67k3vNqDNAp8");

        return new Cloudinary(config);
    }
}
