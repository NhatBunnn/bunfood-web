package com.bunfood.bunfood.dto.reponse;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.bunfood.bunfood.entity.enums.GenderEnum;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResDTO {

    private UUID id;
    private String email;
    private String fullName;
    private String firstName;
    private String lastName;
    private String avatar;
    private String address;
    private Instant dateOfBirth;
    private GenderEnum gender;

    private Set<String> roles = new HashSet<>();
    private Set<String> permissions = new HashSet<>();

}
