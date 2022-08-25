package com.nberimen.reactjavaegitim.sec;

import com.nberimen.reactjavaegitim.sec.dto.SecAuthResponseDto;
import com.nberimen.reactjavaegitim.sec.dto.SecLoginRequestDto;
import com.nberimen.reactjavaegitim.user.dto.UserDto;
import com.nberimen.reactjavaegitim.user.dto.UserSaveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody SecLoginRequestDto secLoginRequestDto){
        SecAuthResponseDto secAuthResponseDto = authService.login(secLoginRequestDto);
        return ResponseEntity.ok(secAuthResponseDto);
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody UserSaveRequest userSaveRequest){
        UserDto userDto = authService.register(userSaveRequest);
        return ResponseEntity.ok(userDto);
    }
}
