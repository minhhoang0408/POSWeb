package com.example.demo.auth.service;

import com.example.demo.auth.entity.AppUser;
import com.example.demo.auth.model.LoginModel;
import com.example.demo.auth.repo.AppUserRepo;
import com.example.demo.auth.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static com.example.demo.utils.EncodeUtils.*;

import java.util.List;
import java.util.Optional;



@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepo appUserRepo;

//    @Autowired
//    private JWTService jwtService;

//    @Override
//    public String getRoleFromCookie(HttpServletRequest request) {
//        String token;
//        String username;
//        Cookie[] cookies = request.getCookies();
//        if (cookies != null) {
//            for (Cookie cookie : cookies) {
//                if (cookie.getName().equals("token")) {
//                    token = cookie.getValue();
//                    username = jwtService.decode(token);
//                    if (username != null) {
//                        return findByUsername(username)
//                                .map(AppUser::getRole)
//                                .orElse(null);
//                    }
//                }
//            }
//        }
//        return null;
//    }

    @Override
    public Optional<AppUser> findById(Integer userId) {
        try {
            return appUserRepo.findById(userId);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findById error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    public List<AppUser> findAll() {
        try {
            return appUserRepo.findAll();
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("upload error" + ex.toString());
            return null;
        }
    }

    @Override
    public Optional<AppUser> findByUsername(String username) {
        try {
            return appUserRepo.findByUsername(username);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findByUsername error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    public Optional<AppUser> findByEmail(String email) {
        try {
            return appUserRepo.findByEmail(email);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findByEmail error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    public Boolean checkUsernameExisted(String username) {
        try {
            return appUserRepo.isUsernameExisted(username);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("checkUsernameExisted error" + ex.toString());
            return false;
        }
    }

    @Override
    public Optional<AppUser> login(LoginModel loginModel) {
        try {
            return appUserRepo.login(loginModel.getUsername(), getSHA256(loginModel.getPassword()));
//            return appUserRepo.login(loginModel.getUsername(), loginModel.getPassword());
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("login error" + ex.toString());
            return Optional.empty();
        }
    }

}
