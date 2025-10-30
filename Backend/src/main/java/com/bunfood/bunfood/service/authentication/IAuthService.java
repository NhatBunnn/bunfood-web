package com.bunfood.bunfood.service.authentication;

import com.bunfood.bunfood.dto.reponse.AuthResDTO;
import com.bunfood.bunfood.dto.request.UserReqDTO;
import com.bunfood.bunfood.dto.request.VerifyCodeReqDTO;

public interface IAuthService {
    boolean verifyCode(VerifyCodeReqDTO verifyCode);

    boolean sendCode(UserReqDTO user);

    boolean register(UserReqDTO user) throws Exception;

    AuthResDTO Login(UserReqDTO user) throws Exception;

    AuthResDTO RefreshAccessToken(String refreshToken) throws Exception;

    AuthResDTO Logout(String refreshToken) throws Exception;
}
