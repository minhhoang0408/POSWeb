//package com.example.demo.auth.security;
//
//import com.example.demo.auth.repo.AppUserRepo;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.List;
//
//
//public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
//
//    private AppUserRepo appUserRepo;
//
//    private com.example.demo.auth.security.JWTService jwtService;
//
//    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, AppUserRepo appUserRepo, com.example.demo.auth.security.JWTService jwtService) {
//        super(authenticationManager);
//        this.appUserRepo = appUserRepo;
//        this.jwtService = jwtService;
//    }
//
//    // verify authentication and provide authorization
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//        String header = request.getHeader(com.example.demo.auth.security.SecurityConstants.HEADER_STRING);
//        if (header != null && header.startsWith(com.example.demo.auth.security.SecurityConstants.TOKEN_PREFIX)) {
//            UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//        } else {
//            System.out.println("No Authorization");
//        }
//        chain.doFilter(request, response);
//    }
//
//    // read token and authorize
//    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
//        String token = request.getHeader(com.example.demo.auth.security.SecurityConstants.HEADER_STRING);
//        if (token != null) {
//            String username = jwtService.decode(token);
//            if (username != null) {
//                return appUserRepo.findByUsername(username)
//                        .map(appUser -> {
//                            System.out.println("User Principal: " + appUser.getUsername());
//                            List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(appUser.getRole()));
//                            return new UsernamePasswordAuthenticationToken(username, null, authorities);
//                        })
//                        .orElse(null);
//            }
//            return null;
//        }
//        return null;
//    }
//}
