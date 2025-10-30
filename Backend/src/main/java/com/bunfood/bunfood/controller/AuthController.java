package com.bunfood.bunfood.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bunfood.bunfood.dto.SuccessResDTO;
import com.bunfood.bunfood.dto.reponse.AuthResDTO;
import com.bunfood.bunfood.dto.request.UserReqDTO;
import com.bunfood.bunfood.dto.request.VerifyCodeReqDTO;
import com.bunfood.bunfood.service.authentication.IAuthService;
import com.bunfood.bunfood.service.verifyCode.IVerifyCodeService;

import lombok.AllArgsConstructor;

@RequestMapping("/api/v1")
@AllArgsConstructor
@RestController
public class AuthController {
    private final IAuthService authService;
    private final IVerifyCodeService verifyCodeService;

    @PostMapping("/users")
    public ResponseEntity<?> register(@RequestBody UserReqDTO user) throws Exception {
        boolean result = this.authService.register(user);

        return ResponseEntity.ok()
                .body(SuccessResDTO.builder()
                        .statusCode(200)
                        .message("Registered successfully")
                        .data(result)
                        .build());
    }

    @PostMapping("/auth/verify-email")
    public ResponseEntity<?> verifyCode(@RequestBody VerifyCodeReqDTO verifyCode) {
        AuthResDTO result = this.verifyCodeService.verifyCode(verifyCode);

        return ResponseEntity.ok()
                .header("Set-Cookie", result.getResponseCookie().toString())
                .body(SuccessResDTO.builder()
                        .statusCode(200)
                        .message("Email verification successful")
                        .data(result)
                        .build());
    }

    @PostMapping("/auth/send-code")
    public ResponseEntity<?> resendCode(@RequestBody UserReqDTO userReq) {
        boolean result = this.authService.sendCode(userReq);

        return ResponseEntity.ok()
                .body(SuccessResDTO.builder()
                        .statusCode(200)
                        .message("Code sent successfully")
                        .data(result)
                        .build());
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> Login(@RequestBody UserReqDTO user) throws Exception {
        AuthResDTO result = this.authService.Login(user);

        return ResponseEntity.ok()
                .header("Set-Cookie", result.getResponseCookie().toString())
                .body(SuccessResDTO.builder()
                        .statusCode(200)
                        .message("Logged in successfully")
                        .data(result)
                        .build());
    }

    @GetMapping("/auth/refresh-Token")
    public ResponseEntity<?> RefreshAccessToken(@CookieValue(name = "refresh_token") String refreshToken)
            throws Exception {
        AuthResDTO result = this.authService.RefreshAccessToken(refreshToken);

        return ResponseEntity.ok()
                .header("Set-Cookie", result.getResponseCookie().toString())
                .body(SuccessResDTO.builder()
                        .statusCode(200)
                        .message("Token created successfully")
                        .data(result)
                        .build());
    }

    @GetMapping("/auth/logout")
    public ResponseEntity<?> Logout(@CookieValue(name = "refresh_token") String refreshToken)
            throws Exception {
        AuthResDTO result = this.authService.Logout(refreshToken);

        return ResponseEntity.ok()
                .header("Set-Cookie", result.getResponseCookie().toString())
                .body(SuccessResDTO.builder()
                        .statusCode(200)
                        .message("Logged out successfully")
                        .data(result)
                        .build());
    }
}
