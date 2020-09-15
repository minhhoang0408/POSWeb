//package com.example.demo.auth.security;
//
//
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.algorithms.Algorithm;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//
//import static com.example.demo.auth.security.SecurityConstants.SECRET;
//import static com.example.demo.auth.security.SecurityConstants.TOKEN_PREFIX;
//
//
//@Service
//public class JWTService {
//
//    //encode token
//    public String generateToken(String username, long expirationTime) {
//        return TOKEN_PREFIX
//                + JWT.create()
//                .withSubject(username)
//                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
//                .sign(Algorithm.HMAC512(SECRET.getBytes()));
//    }
//
//    //decode token
//    public String decode(String token) {
//        try {
//            return JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
//                    .build()
//                    .verify(token.replace(TOKEN_PREFIX, ""))
//                    .getSubject();
//        } catch (Exception ex) {
//            System.err.println(ex.getMessage());
//            return null;
//        }
//    }
//}
