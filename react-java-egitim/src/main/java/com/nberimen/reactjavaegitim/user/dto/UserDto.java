package com.nberimen.reactjavaegitim.user.dto;

import com.nberimen.reactjavaegitim.user.User;
import lombok.Data;

@Data
public class UserDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private String image;
    public UserDto(User user){
        this.setId(user.getId());
        this.setUsername(user.getUsername());
        this.setFirstName(user.getFirstName());
        this.setLastName(user.getLastName());
        this.setImage(user.getImage());
    }
}
