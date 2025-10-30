package com.bunfood.bunfood.security;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bunfood.bunfood.code.ErrorCode;
import com.bunfood.bunfood.exception.ApiException;
import com.bunfood.bunfood.service.user.IUserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {
    private IUserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.bunfood.bunfood.entity.User user = userService.findByEmail(username);

        if (user == null)
            throw new ApiException(ErrorCode.USER_NOT_FOUND);

        if (user.isEmailVerified() == false)
            throw new ApiException(ErrorCode.USER_NOT_VERIFIED);

        return new User(user.getEmail(), user.getPassword(), new ArrayList());
    }

}
