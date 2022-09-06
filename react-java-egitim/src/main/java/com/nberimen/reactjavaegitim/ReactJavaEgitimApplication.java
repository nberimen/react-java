package com.nberimen.reactjavaegitim;

import com.nberimen.reactjavaegitim.user.User;
import com.nberimen.reactjavaegitim.user.UserService;
import com.nberimen.reactjavaegitim.user.dto.UserSaveRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ReactJavaEgitimApplication {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(ReactJavaEgitimApplication.class, args);
    }

    @Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        return args -> {
            for (int i = 1; i <= 25; i++) {
                UserSaveRequest user = new UserSaveRequest();
                user.setUsername("user" + i);
                user.setFirstName("user" + i);
                user.setLastName("user" + i);
                user.setPassword("P4ssword");
                userService.save(user);
            }
        };
    }

}
