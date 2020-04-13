package com.example.restservice.controller;

import com.example.restservice.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {

    Integer id = 1;
    private Map<Integer, User> userlist = new HashMap<>();

    @PostMapping("/user/")
    public User create(String name) {
        User user = new User(id, name);
        id++;
        return user;
    }

    @PostMapping("/user/{id}")
    public User update(Integer id, String name) {
        userlist.get(id).setName(name);
        return userlist.get(id);
    }

    public void delete(Integer id) {
        userlist.remove(id);
    }

    @GetMapping("/user/{id}")
    public User read(@RequestParam(value = "id") Integer id) {
        return null;
    }

    public List<User> getAll() {
        return new ArrayList<>();
    }
}
