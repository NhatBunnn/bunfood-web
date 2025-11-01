package com.bunfood.bunfood.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bunfood.bunfood.dto.SuccessResDTO;
import com.bunfood.bunfood.dto.reponse.UserResDTO;
import com.bunfood.bunfood.entity.User;
import com.bunfood.bunfood.mapper.UserMapper;
import com.bunfood.bunfood.security.SecurityUtil;
import com.bunfood.bunfood.service.user.IUserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final IUserService userService;
    private final UserMapper userMapper;
    private final SecurityUtil securityUtil;

    @GetMapping("/users/me")
    public ResponseEntity<?> findMe() {

        User user = this.userService
                .findById(UUID.fromString(this.securityUtil.getCurrentUser().get()));
        UserResDTO userDto = this.userMapper.convertToUserResponseDTO(user);

        return ResponseEntity.ok()
                .body(SuccessResDTO.builder()
                        .statusCode(201)
                        .message("WordSets retrieved successfully")
                        .data(userDto)
                        .build());
    }
}
