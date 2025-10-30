package com.bunfood.bunfood.service.user;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.bunfood.bunfood.code.ErrorCode;
import com.bunfood.bunfood.entity.User;
import com.bunfood.bunfood.exception.ApiException;
import com.bunfood.bunfood.mapper.UserMapper;
import com.bunfood.bunfood.repository.UserRepo;
import com.bunfood.bunfood.security.SecurityUtil;
import com.bunfood.bunfood.service.CloudinaryService.CloudinaryService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserService implements IUserService {
    private final UserRepo userRepository;
    private final UserMapper userMapper;
    private final CloudinaryService cloudinaryService;
    private final SecurityUtil securityUtil;
    // private final RoleMapper roleMapper;

    @Override
    public User save(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public User findById(UUID userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.ID_NOT_FOUND));
    }
}
