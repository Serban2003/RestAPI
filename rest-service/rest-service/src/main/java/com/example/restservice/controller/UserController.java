package com.example.restservice.controller;

import com.example.restservice.dao.User;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;


@Controller
public class UserController{
    Connection conn;
    Statement statement;

    {
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost/store","root","");
            statement = conn.createStatement();
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
    }

    @ResponseBody
    @PostMapping("/user/")
    public User create(@RequestBody User user) throws SQLException, NoSuchAlgorithmException {
        String password = getMD5Encrypted(user);
        statement.executeUpdate("INSERT INTO `User` (`firstname`, `lastname`, `email`, `password`)" +
                "VALUES ('" + user.getFirstname() + "', '" + user.getLastname() + "', '" + user.getEmail() + "', '" + password + "')");
        return user;
    }

    private String getMD5Encrypted(@RequestBody User user) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(user.getPassword().getBytes());
        return DatatypeConverter.printHexBinary(md.digest()).toUpperCase();
    }

    @ResponseBody
    @PostMapping("/user/update/")
    public void update(@RequestBody User user) throws SQLException, NoSuchAlgorithmException {
        String password = getMD5Encrypted(user);
        statement.executeUpdate("UPDATE `User` SET firstname = '" + user.getFirstname() +
                "', lastname = '" + user.getLastname() + "', email = '" + user.getEmail() + "', password = '" + password + "' WHERE u_id = " + user.getId());
    }

    @ResponseBody
    @PostMapping("/user/delete/")
    public void delete(@RequestBody User user) throws SQLException {
        statement.executeUpdate("DELETE FROM `User` WHERE u_id = " + user.getId());
    }

    @ResponseBody
    @RequestMapping(value = "user/allusers/")
    protected String doGet() throws SQLException {
        JSONArray jsArray = new JSONArray();
        Gson gson = new Gson();

        ResultSet resultSet = statement.executeQuery("SELECT * FROM `User`");
        while(resultSet.next()){
            JSONObject jObj = new JSONObject();
            try {
                jObj.put("id", resultSet.getLong("u_id"));
                jObj.put("firstname", resultSet.getString("firstname"));
                jObj.put("lastname", resultSet.getString("lastname"));
                jObj.put("email", resultSet.getString("email"));
                jObj.put("password", resultSet.getString("password"));
                jsArray.put(jObj);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return gson.toJson(jsArray);
    }
}
