package com.bunfood.bunfood.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bunfood.bunfood.entity.User;

public interface UserRepo extends JpaRepository<User, UUID> {
    User save(User user);

    User findByEmail(String email);

    Page<User> findAll(Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.isEmailVerified = true")
    Page<User> findAllVerifiedUsers(Pageable pageable, @Param("myId") UUID myId);

    Optional<User> findById(UUID id);

    boolean existsByEmail(String email);

    long deleteByIsEmailVerified(boolean isVerifed);

    Page<User> findAll(Specification specification, Pageable pageable);
}
