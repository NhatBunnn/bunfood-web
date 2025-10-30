package com.bunfood.bunfood.service.refreshToken;

import org.springframework.stereotype.Service;

import com.bunfood.bunfood.entity.RefreshToken;
import com.bunfood.bunfood.entity.User;
import com.bunfood.bunfood.repository.RefreshTokenRepo;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class RefreshTokenService implements IRefreshTokenService {
    private final RefreshTokenRepo refreshTokenRepository;

    @Override
    public RefreshToken save(RefreshToken refreshToken) {
        return this.refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken findByRefreshTokenAndUser(String refreshToken, User user) {
        return this.refreshTokenRepository.findByRefreshTokenAndUserAndIsRevokedFalse(refreshToken, user);
    }

    @Override
    public void delete(RefreshToken refreshToken) {
        this.refreshTokenRepository.delete(refreshToken);
    }

    public void update(RefreshToken refreshToken) {
        this.refreshTokenRepository.save(refreshToken);
    }

}
