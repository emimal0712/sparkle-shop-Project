package com.example.ecommerce.Security;

import com.example.ecommerce.service.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
public class JwtFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private CustomUserDetailsService userDetailsService;



    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {



        String authHeader = request.getHeader("Authorization");


        String token = null;
        String username = null;



        // Check Bearer Token
        if(authHeader != null && authHeader.startsWith("Bearer ")){

            token = authHeader.substring(7);


            try {

                username = jwtUtil.extractUsername(token);

            } catch(Exception e){

                System.out.println("Invalid JWT Token");

            }

        }



        // Authenticate user if token is valid
        if(username != null &&
                SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null){



            var userDetails =
                    userDetailsService
                            .loadUserByUsername(username);



            if(jwtUtil.validateToken(token, username)){



                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );



                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );



                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authenticationToken);

            }

        }



        // Continue request
        filterChain.doFilter(request, response);

    }
}