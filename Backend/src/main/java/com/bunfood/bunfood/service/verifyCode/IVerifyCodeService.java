package com.bunfood.bunfood.service.verifyCode;

import com.bunfood.bunfood.dto.reponse.AuthResDTO;
import com.bunfood.bunfood.dto.request.VerifyCodeReqDTO;
import com.bunfood.bunfood.entity.User;
import com.bunfood.bunfood.entity.VerifyCode;

public interface IVerifyCodeService {
    String generate6Digits();

    boolean sendCode(User user);

    AuthResDTO verifyCode(VerifyCodeReqDTO verifyCode);

    void delete(VerifyCode verifyCode);

}
