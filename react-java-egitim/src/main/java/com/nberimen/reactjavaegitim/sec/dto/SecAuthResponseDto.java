package com.nberimen.reactjavaegitim.sec.dto;

import lombok.Data;

@Data
public class SecAuthResponseDto {
    private Long id;
    private String username;
    private String token;
}
