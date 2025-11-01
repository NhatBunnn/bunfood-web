package com.bunfood.bunfood.repository;

import java.time.Instant;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bunfood.bunfood.entity.VerifyCode;

public interface VerifyCodeRepo extends JpaRepository<VerifyCode, Long> {

    long deleteByUserIdAndExpiresAtBefore(UUID userId, Instant time);

    VerifyCode findByUserId(UUID userId);

    void delete(VerifyCode verifyCode);
}