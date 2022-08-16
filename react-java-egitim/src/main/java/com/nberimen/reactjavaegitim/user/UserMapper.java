package com.nberimen.reactjavaegitim.user;

import com.nberimen.reactjavaegitim.user.dto.UserDto;
import com.nberimen.reactjavaegitim.user.dto.UserSaveRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    List<UserDto> convertToUserDtoList(List<User> userList);

    UserDto convertToUserDto(User user);

    User convertToUser(UserSaveRequest userSaveRequest);

}
