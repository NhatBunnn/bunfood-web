package com.bunfood.bunfood.repository;

import java.time.Instant;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bunfood.bunfood.entity.User;
import com.bunfood.bunfood.entity.VerifyCode;

public interface VerifyCodeRepo extends JpaRepository<VerifyCode, Long> {
    Optional<VerifyCode> findTopByUserOrderByCreatedAtDesc(User user);

    long deleteByUserAndExpiresAtBefore(User user, Instant time);

    VerifyCode findByUser(User user);

    void delete(VerifyCode verifyCode);
}