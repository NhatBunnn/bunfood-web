package com.bunfood.bunfood.entity;

import java.time.Instant;
<<<<<<< HEAD
import java.util.HashSet;
import java.util.List;
import java.util.Set;
=======
import java.util.List;
>>>>>>> befac02 (initial setup)
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.bunfood.bunfood.entity.enums.GenderEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
<<<<<<< HEAD
=======
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
>>>>>>> befac02 (initial setup)
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@Entity
public class User {
    @Id
<<<<<<< HEAD
    @UuidGenerator
    @Column(updatable = false, nullable = false)
    private UUID id;
=======
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
>>>>>>> befac02 (initial setup)

    private String firstName;

    private String lastName;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Instant dateOfBirth;

    private String address;

    @Column(length = 1000)
    private String avatar;

    private int status;

    private boolean isEmailVerified = false;

    private Instant createdAt;

    private Instant updatedAt;

<<<<<<< HEAD
    private Instant deletedAt;

=======
>>>>>>> befac02 (initial setup)
    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
        updateFullName();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
        updateFullName();
    }

    private void updateFullName() {
        this.fullName = (firstName != null ? firstName : "")
                + " "
                + (lastName != null ? lastName : "");
        this.fullName = this.fullName.trim();
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RefreshToken> refreshToken;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private VerifyCode verifyCode;
}
