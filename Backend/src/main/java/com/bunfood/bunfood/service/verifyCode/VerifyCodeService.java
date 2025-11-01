package com.bunfood.bunfood.service.verifyCode;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import com.bunfood.bunfood.code.ErrorCode;
import com.bunfood.bunfood.dto.reponse.AuthResDTO;
import com.bunfood.bunfood.dto.request.VerifyCodeReqDTO;
import com.bunfood.bunfood.entity.User;
import com.bunfood.bunfood.entity.VerifyCode;
import com.bunfood.bunfood.exception.ApiException;
import com.bunfood.bunfood.mapper.UserMapper;
import com.bunfood.bunfood.repository.VerifyCodeRepo;
import com.bunfood.bunfood.security.JwtTokenProvider;
import com.bunfood.bunfood.security.JwtUtil;
import com.bunfood.bunfood.service.email.IEmailService;
import com.bunfood.bunfood.service.user.IUserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class VerifyCodeService implements IVerifyCodeService {
    private VerifyCodeRepo verifyCodeRepository;
    private SecureRandom secureRandom;
    private IUserService userService;
    private final IEmailService emailService;
    private final JwtUtil jwtUtil;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    // private void unlinkVerifyCode(User user, VerifyCode code) {
    // if (user != null) {
    // user.setVerifyCode(null);
    // }
    // if (code != null) {
    // code.setUser(null);
    // }
    // }

    public String generate6Digits() {
        int n = secureRandom.nextInt(1_000_000);
        return String.format("%06d", n);
    }

    @Override
    public void delete(VerifyCode verifyCode) {
        this.verifyCodeRepository.delete(verifyCode);
    }

    @Override
    public boolean sendCode(User user) {
        if (user == null)
            return false;

        VerifyCode verifyCode = this.verifyCodeRepository.findByUserId(user.getId());

        if (verifyCode == null) {
            verifyCode = new VerifyCode();
            verifyCode.setUserId(user.getId());
        } else {
            if (verifyCode.getRetryAvailableAt().isAfter(Instant.now()))
                throw new ApiException(ErrorCode.EMAIL_CODE_ATTEMPTS_EXCEEDED);
        }

        verifyCode.setUsed(false);
        verifyCode.setExpiresAt(Instant.now().plus(5, ChronoUnit.MINUTES));
        verifyCode.setCode(generate6Digits());

        this.verifyCodeRepository.save(verifyCode);

        this.emailService.sendVerificationCode(user.getEmail(), verifyCode.getCode());

        return true;
    }

    @Override
    public AuthResDTO verifyCode(VerifyCodeReqDTO verifyCode) {
        User user = this.userService.findByEmail(verifyCode.getEmail());
        VerifyCode currentVerifyCode = this.verifyCodeRepository.findByUserId(user.getId());

        if (user.isEmailVerified())
            throw new ApiException(ErrorCode.USER_NOT_VERIFIED);

        if (currentVerifyCode.getRetryAvailableAt().isAfter(Instant.now()))
            throw new ApiException(ErrorCode.EMAIL_CODE_ATTEMPTS_EXCEEDED);

        if (currentVerifyCode.isUsed())
            throw new ApiException(ErrorCode.EMAIL_CODE_USED);

        if (verifyCode.getCode().isEmpty() || !verifyCode.getCode().equals(currentVerifyCode.getCode())) {
            currentVerifyCode.setUsed(true);

            int verifyAttempts = currentVerifyCode.getFailedVerifyAttempts();
            verifyAttempts++;

            currentVerifyCode.setFailedVerifyAttempts(verifyAttempts);

            if (verifyAttempts >= 3) {
                currentVerifyCode.setFailedVerifyAttempts(0);
                currentVerifyCode.setRetryAvailableAt(Instant.now().plus(30, ChronoUnit.MINUTES));
            }

            this.verifyCodeRepository.save(currentVerifyCode);

            throw new ApiException(ErrorCode.EMAIL_CODE_INVALID);
        }

        if (currentVerifyCode.getExpiresAt().isBefore(Instant.now()))
            throw new ApiException(ErrorCode.EMAIL_CODE_EXPIRED);

        this.verifyCodeRepository.save(currentVerifyCode);

        user.setEmailVerified(true);
        this.userService.save(user);

        // unlinkVerifyCode(user, currentVerifyCode);
        delete(currentVerifyCode);

        String accessToken = this.jwtTokenProvider.generateAccessToken(user);
        String refreshToken = this.jwtTokenProvider.generateRefreshToken(user);

        ResponseCookie responseCookie = ResponseCookie
                .from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtUtil.getRefreshTokenExpiration())
                .sameSite("None")
                .build();

        AuthResDTO authDTO = new AuthResDTO();
        authDTO = userMapper.convertToAuthResponseDTO(user, accessToken, refreshToken, responseCookie);
        return authDTO;
    }

}
