package com.nberimen.reactjavaegitim.sec.security;

import com.nberimen.reactjavaegitim.sec.security.JwtUserDetails;
import com.nberimen.reactjavaegitim.user.User;
import com.nberimen.reactjavaegitim.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final UserService userService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User inDB = userService.findByUsername(username);
        if (inDB == null) {
            throw new UsernameNotFoundException("User not found!");
        }
        return JwtUserDetails.createAuth(inDB);
    }
}
