package com.example.restservice.controller;

import com.example.restservice.dao.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.InvocationTargetException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;


@Controller
public class UserController extends UniversalController<User>{

    @ResponseBody
    @PostMapping("/user/")
    @Override
    public User create(@RequestBody User user) throws SQLException, NoSuchAlgorithmException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        return super.create(user);
    }

    @ResponseBody
    @PostMapping("/user/update/")
    public void update(@RequestBody User user) throws SQLException, NoSuchAlgorithmException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        super.update(user);
    }

    @ResponseBody
    @PostMapping("/user/delete/")
    public void delete(@RequestBody User user) throws SQLException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        super.delete(user);
    }

    @ResponseBody
    @RequestMapping(value = "user/allusers/")
    protected String doGet() throws SQLException {
        return super.get();
    }
}
