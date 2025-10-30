package com.bunfood.bunfood.dto.reponse;

import org.springframework.http.ResponseCookie;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResDTO {

    @JsonProperty("user")
    private UserResDTO user;

    @JsonIgnore
    private String refreshToken;

    private String accessToken;

    @JsonIgnore
    private ResponseCookie responseCookie;
}
