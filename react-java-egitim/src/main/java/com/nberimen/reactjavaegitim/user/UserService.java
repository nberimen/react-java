package com.nberimen.reactjavaegitim.user;

import com.nberimen.reactjavaegitim.user.dto.UserDto;
import com.nberimen.reactjavaegitim.user.dto.UserSaveRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto save(UserSaveRequest userSaveRequest) {
        User user = UserMapper.INSTANCE.convertToUser(userSaveRequest);
        String password = passwordEncoder.encode(user.getPassword());
        user.setPassword(password);
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

    public User findByUsername(String username) {
        User inDB = userRepository.findByUsername(username);
        return inDB;
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
