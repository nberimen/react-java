package com.nberimen.reactjavaegitim.user.dto;

import lombok.Data;

@Data
public class UserSaveRequest {

    private String firstName;

    private String lastName;

    private String username;

    private String password;

    private String image;
}
