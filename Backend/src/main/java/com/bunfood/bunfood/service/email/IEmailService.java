package com.bunfood.bunfood.service.email;

public interface IEmailService {
    void sendVerificationCode(String toEmail, String code);
}
