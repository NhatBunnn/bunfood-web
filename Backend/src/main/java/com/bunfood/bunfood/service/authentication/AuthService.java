package com.bunfood.bunfood.service.authentication;

import java.time.Instant;
import java.util.UUID;

import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.bunfood.bunfood.code.ErrorCode;
import com.bunfood.bunfood.dto.reponse.AuthResDTO;
import com.bunfood.bunfood.dto.request.UserReqDTO;
import com.bunfood.bunfood.dto.request.VerifyCodeReqDTO;
import com.bunfood.bunfood.entity.RefreshToken;
import com.bunfood.bunfood.entity.User;
import com.bunfood.bunfood.exception.ApiException;
import com.bunfood.bunfood.mapper.UserMapper;
import com.bunfood.bunfood.security.JwtTokenProvider;
import com.bunfood.bunfood.security.JwtUtil;
import com.bunfood.bunfood.service.refreshToken.IRefreshTokenService;
import com.bunfood.bunfood.service.user.IUserService;
import com.bunfood.bunfood.service.verifyCode.IVerifyCodeService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AuthService implements IAuthService {
    private final IUserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final IRefreshTokenService refreshTokenService;
    private final IVerifyCodeService verifyCodeService;
    // private final IRoleService roleService;
    // private final SettingRepo settingRepo;

    @Override
    public boolean verifyCode(VerifyCodeReqDTO verifyCode) {
        AuthResDTO result = this.verifyCodeService.verifyCode(verifyCode);
        if (result == null)
            return false;
        return true;
    }

    @Override
    public boolean sendCode(UserReqDTO user) {
        return this.verifyCodeService.sendCode(this.userService.findByEmail(user.getEmail()));
    }

    @Override
    public boolean register(UserReqDTO user) throws Exception {
        boolean isEmailExit = this.userService.existsByEmail(user.getEmail());

        if (isEmailExit) {
            throw new ApiException(ErrorCode.EMAIL_EXISTS);
        }

        String hashPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);

        User currentUser = new User();
        currentUser = this.userMapper.convertToUser(user);

        // Role role = roleService.findByName("ROLE_USER");
        // currentUser.getRoles().add(role);

        this.userService.save(currentUser);

        this.verifyCodeService.sendCode(currentUser);

        return true;
    }

    @Override
    public AuthResDTO Login(UserReqDTO user) throws Exception {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    user.getEmail(), user.getPassword());
            Authentication authentication = authenticationManagerBuilder.getObject()
                    .authenticate(usernamePasswordAuthenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            throw new ApiException(ErrorCode.AUTH_INVALID);
        }

        User currentUser = this.userService.findByEmail(user.getEmail());

        String accessToken = this.jwtTokenProvider.generateAccessToken(currentUser);
        String refreshToken = this.jwtTokenProvider.generateRefreshToken(currentUser);

        ResponseCookie responseCookie = ResponseCookie
                .from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtUtil.getRefreshTokenExpiration())
                .sameSite("None")
                .build();

        AuthResDTO authDTO = new AuthResDTO();
        authDTO = userMapper.convertToAuthResponseDTO(currentUser, accessToken, refreshToken, responseCookie);

        return authDTO;
    }

    @Override
    public AuthResDTO RefreshAccessToken(String refreshToken) throws Exception {
        if (refreshToken.equals(""))
            throw new ApiException(ErrorCode.AUTH_SESSION_INVALID);

        Jwt decodedJwt = this.jwtUtil.decodeToken(refreshToken);
        UUID userId = UUID.fromString(decodedJwt.getSubject());

        User currentUser = this.userService.findById(userId);

        RefreshToken currentRefreshToken = this.refreshTokenService.findByRefreshTokenAndUser(refreshToken,
                currentUser);

        if (currentUser == null || currentRefreshToken == null ||
                currentRefreshToken.isRevoked() == true
                || Instant.now().isAfter(currentRefreshToken.getExpiryDate()))
            throw new ApiException(ErrorCode.AUTH_SESSION_EXPIRED);

        currentRefreshToken.setRevoked(true);
        this.refreshTokenService.update(currentRefreshToken);

        String accessToken = this.jwtTokenProvider.generateAccessToken(currentUser);
        String newRefreshToken = this.jwtTokenProvider.generateRefreshToken(currentUser);

        ResponseCookie responseCookie = ResponseCookie
                .from("refresh_token", newRefreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtUtil.getRefreshTokenExpiration())
                .sameSite("None")
                .build();

        AuthResDTO authDTO = new AuthResDTO();
        authDTO = userMapper.convertToAuthResponseDTO(currentUser, accessToken, newRefreshToken, responseCookie);
        return authDTO;
    }

    @Override
    public AuthResDTO Logout(String refreshToken) throws Exception {
        if (refreshToken.equals(""))
            throw new ApiException(ErrorCode.AUTH_SESSION_INVALID);

        Jwt decodedJwt = this.jwtUtil.decodeToken(refreshToken);
        UUID userId = UUID.fromString(decodedJwt.getSubject());

        User currentUser = this.userService.findById(userId);

        RefreshToken currentRefreshToken = this.refreshTokenService.findByRefreshTokenAndUser(refreshToken,
                currentUser);

        if (currentUser == null || currentRefreshToken == null ||
                currentRefreshToken.isRevoked() == true
                || Instant.now().isAfter(currentRefreshToken.getExpiryDate()))
            throw new ApiException(ErrorCode.AUTH_SESSION_EXPIRED);

        currentRefreshToken.setRevoked(true);
        this.refreshTokenService.update(currentRefreshToken);

        ResponseCookie responseCookie = ResponseCookie
                .from("refresh_token", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();

        AuthResDTO authDTO = new AuthResDTO();
        authDTO = userMapper.convertToAuthResponseDTO(currentUser, null, null, responseCookie);

        return authDTO;
    }

}
