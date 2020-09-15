package com.example.demo.auth.service;

import com.example.demo.auth.entity.AppUser;
import com.example.demo.auth.model.LoginModel;

import java.util.List;
import java.util.Optional;

public interface AppUserService {

//    String getRoleFromCookie(HttpServletRequest request);

    Optional<AppUser> findById(Integer userId);

    List<AppUser> findAll();

    Optional<AppUser> findByUsername(String username);

    Optional<AppUser> findByEmail(String email);

    Boolean checkUsernameExisted(String username);

    Optional<AppUser> login(LoginModel loginModel);

}
