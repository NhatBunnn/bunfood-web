package com.bunfood.bunfood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bunfood.bunfood.entity.RefreshToken;
import com.bunfood.bunfood.entity.User;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {
    RefreshToken save(RefreshToken refreshToken);

    RefreshToken findByRefreshTokenAndUserAndIsRevokedFalse(String refreshToken, User user);

    void delete(RefreshToken refreshToken);
}
