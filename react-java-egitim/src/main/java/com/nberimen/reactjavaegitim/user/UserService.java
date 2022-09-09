package com.nberimen.reactjavaegitim.user;

import com.nberimen.reactjavaegitim.user.dto.UserDto;
import com.nberimen.reactjavaegitim.user.dto.UserSaveRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        return new UserDto(user);
    }

    public Page<User> getUsers(Pageable pageable, User user) {
        if (user != null) {
            return userRepository.findByIdNot(user.getId(), pageable);
        }
        return userRepository.findAll(pageable);
    }

    public UserDto findById(Long id) {
        User inDB = getUser(id);
        return new UserDto(inDB);
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
