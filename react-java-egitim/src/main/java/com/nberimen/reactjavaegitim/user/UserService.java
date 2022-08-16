package com.nberimen.reactjavaegitim.user;

import com.nberimen.reactjavaegitim.user.dto.UserDto;
import com.nberimen.reactjavaegitim.user.dto.UserSaveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDto save(UserSaveRequest userSaveRequest) {
        User user = UserMapper.INSTANCE.convertToUser(userSaveRequest);
        user = userRepository.save(user);
        UserDto userDto = UserMapper.INSTANCE.convertToUserDto(user);
        return userDto;
    }

    public List<UserDto> findAll() {
        List<User> userList = userRepository.findAll();
        List<UserDto> userDtoList = UserMapper.INSTANCE.convertToUserDtoList(userList);
        return userDtoList;
    }

    public UserDto findById(Long id) {
        User inDB = getUser(id);
        UserDto userDto = UserMapper.INSTANCE.convertToUserDto(inDB);
        return userDto;
    }

    public void delete(Long id) {
        User inDB = getUser(id);
        userRepository.delete(inDB);
    }


    private User getUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new RuntimeException();
        }
    }

}
