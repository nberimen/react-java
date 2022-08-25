package com.nberimen.reactjavaegitim.sec;

import com.nberimen.reactjavaegitim.sec.dto.SecAuthResponseDto;
import com.nberimen.reactjavaegitim.sec.dto.SecLoginRequestDto;
import com.nberimen.reactjavaegitim.sec.security.JwtUserDetails;
import com.nberimen.reactjavaegitim.sec.security.TokenManager;
import com.nberimen.reactjavaegitim.user.User;
import com.nberimen.reactjavaegitim.user.UserService;
import com.nberimen.reactjavaegitim.user.dto.UserDto;
import com.nberimen.reactjavaegitim.user.dto.UserSaveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenManager tokenManager;

    public UserDto register(UserSaveRequest userSaveRequest) {
        return userService.save(userSaveRequest);
    }


    public SecAuthResponseDto login(SecLoginRequestDto secLoginRequestDto) {
        User inDB = userService.findByUsername(secLoginRequestDto.getUsername());
        if (inDB == null) {
            //TODO: Gen Exception
        }
        boolean matches = passwordEncoder.matches(secLoginRequestDto.getPassword(), inDB.getPassword());
        if (!matches) {
            //TODO: Gen Exception
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(secLoginRequestDto.getUsername(), secLoginRequestDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenManager.generateToken(authentication);
        return getSecLoginResponseDto(authentication, token);
    }

    private SecAuthResponseDto getSecLoginResponseDto(Authentication authentication, String token) {
        SecAuthResponseDto secAuthResponseDto = new SecAuthResponseDto();
        JwtUserDetails authenticationPrincipal = (JwtUserDetails) authentication.getPrincipal();

        secAuthResponseDto.setId(authenticationPrincipal.getId());
        secAuthResponseDto.setUsername(authenticationPrincipal.getUsername());
        secAuthResponseDto.setToken(token);
        return secAuthResponseDto;
    }
}
