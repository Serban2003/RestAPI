package com.example.restservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;


@Controller
public class CookieController {

    @GetMapping("/setCookie")
    public void setCookie(HttpServletResponse response, String email) {
        Cookie cookie = new Cookie("email", email);
        response.addCookie(cookie);
    }

    @GetMapping("/deleteCookie")
    public void deleteCookie(HttpServletResponse response){
        Cookie cookie = new Cookie("email","");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
