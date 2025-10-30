package com.bunfood.bunfood.service.refreshToken;

import com.bunfood.bunfood.entity.RefreshToken;
import com.bunfood.bunfood.entity.User;

public interface IRefreshTokenService {
    RefreshToken save(RefreshToken refreshToken);

    RefreshToken findByRefreshTokenAndUser(String refreshToken, User user);

    void delete(RefreshToken refreshToken);

    void update(RefreshToken refreshToken);
}
