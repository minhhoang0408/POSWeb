package com.example.demo.auth.controller;

import com.example.demo.auth.model.LoginModel;
import com.example.demo.auth.model.LoginResult;
import com.example.demo.auth.service.AppUserService;
import com.example.demo.json.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin/app-user")
@CrossOrigin("*")
public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    @PostMapping("/login")
    public ResponseEntity<JsonResult> login(@RequestBody LoginModel loginModel) {
        if (loginModel.getUsername() != null && loginModel.getPassword() != null ) {
            return appUserService.login(loginModel)
                    .map(appUser -> JsonResult.success(new LoginResult(appUser.getRole(), appUser.getUsername(), appUser.getEmail())))
                    .orElse(JsonResult.notFound("Invalid Authentication Information"));
        }else return ResponseEntity.badRequest().build();
    }
}

