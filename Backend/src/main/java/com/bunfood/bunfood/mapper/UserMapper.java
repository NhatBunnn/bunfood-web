package com.bunfood.bunfood.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import com.bunfood.bunfood.dto.reponse.AuthResDTO;
import com.bunfood.bunfood.dto.reponse.UserResDTO;
import com.bunfood.bunfood.dto.request.UserReqDTO;
import com.bunfood.bunfood.entity.User;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserMapper {

    public AuthResDTO convertToAuthResponseDTO(User user, String accessToken, String refreshToken,
            ResponseCookie responseCookie) {
        AuthResDTO authDTO = new AuthResDTO();
        authDTO.setUser(convertToUserResponseDTO(user));
        authDTO.setAccessToken(accessToken);
        authDTO.setRefreshToken(refreshToken);
        authDTO.setResponseCookie(responseCookie);

        return authDTO;

    }

    public UserResDTO convertToUserResponseDTO(User user) {
        UserResDTO userDTO = new UserResDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setFullName(user.getFullName());
        userDTO.setAvatar(user.getAvatar());
        userDTO.setAddress(user.getAddress());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setGender(user.getGender());

        return userDTO;
    }

    public Page<UserResDTO> convertToUserResponseDTO(Page<User> users) {
        List<UserResDTO> userReponseList = new ArrayList<>();

        for (User user : users) {
            userReponseList.add(this.convertToUserResponseDTO(user));
        }

        return new PageImpl<>(userReponseList, users.getPageable(), users.getTotalElements());
    }

    public UserReqDTO convertToUserRequestDTO(User user) {
        UserReqDTO userDTO = new UserReqDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setPassword(user.getPassword());
        userDTO.setAvatar(user.getAvatar());
        userDTO.setAddress(user.getAddress());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setGender(user.getGender());
        userDTO.updateFullName();

        return userDTO;
    }

    public User convertToUser(UserReqDTO userDTO) {
        User user = new User();

        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());

        return user;
    }

}
