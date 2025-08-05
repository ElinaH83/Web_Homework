package com.example.drawingApp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.drawingApp.entity.User;
import com.example.drawingApp.repository.UserRepository;

@Configuration
public class Data {

    @Bean
    public CommandLineRunner initUsers(UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            if (!userRepo.existsById("elina")) {
                userRepo.save(new User("elina", encoder.encode("1234")));
            }

            if (!userRepo.existsById("melika")) {
                userRepo.save(new User("melika", encoder.encode("asdf")));
            }

            if (!userRepo.existsById("me")) {
                userRepo.save(new User("me", encoder.encode("12as")));
            }
        };
    }
}
