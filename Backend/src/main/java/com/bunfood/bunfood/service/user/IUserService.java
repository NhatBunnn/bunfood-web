package com.bunfood.bunfood.service.user;

import java.util.UUID;

import com.bunfood.bunfood.entity.User;

public interface IUserService {
    User save(User user);

    User findByEmail(String email);

    boolean existsByEmail(String email);

    User findById(UUID userId);
}
