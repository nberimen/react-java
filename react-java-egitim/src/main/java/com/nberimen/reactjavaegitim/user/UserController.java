package com.nberimen.reactjavaegitim.user;

import com.nberimen.reactjavaegitim.shared.CurrentUser;
import com.nberimen.reactjavaegitim.user.dto.UserDto;
import com.nberimen.reactjavaegitim.user.dto.UserSaveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/1.0/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping()
    public Page<UserDto> getUsers(Pageable pageable, @CurrentUser User user) {

        return userService.getUsers(pageable, user).map(UserDto::new);
    }

    @PostMapping()
    public ResponseEntity save(@RequestBody UserSaveRequest userSaveRequest) {
        UserDto userDto = userService.save(userSaveRequest);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/{username}")
    public ResponseEntity findByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        userService.delete(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
