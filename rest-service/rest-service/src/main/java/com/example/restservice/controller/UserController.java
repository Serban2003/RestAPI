package com.example.restservice.controller;

import com.example.restservice.User;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class UserController {

    Integer id = 1;

    private List<User> allUsers = new ArrayList<>();
    private Map<Integer, User> userlist = new HashMap<>();
    private static final Logger logger = LoggerFactory.getLogger(GreetingController.class);

    @ResponseBody
    @PostMapping("/user/")
    public User create(@RequestBody User user) {
        user.setId(id);
        id++;
        logger.debug("Creating user: id = " + user.getId() + " name = " + user.getName());
        userlist.put(user.getId(), user);
        getAll();
        return user;
    }

    @ResponseBody
    @PostMapping("/user/update/")
    public User update(@RequestBody User user) {

        logger.debug("Updating user: id = " + user.getId() + " name = " + userlist.get(user.getId()).getName() + " with name = " + user.getName());
        userlist.get(user.getId()).setName(user.getName());
        return userlist.get(id);
    }

    @ResponseBody
    @PostMapping("/user/delete/")
    public void delete(@RequestBody User user) {

        userlist.remove(user.getId());
        logger.debug("Deleting user: id = " + user.getId() + " name = " + user.getName());
        allUsers.clear();
    }

    @ResponseBody
    @RequestMapping(value = "user/allusers/")
    protected String doGet() {
        JSONArray jsArray = new JSONArray();
        Gson gson = new Gson();

        for (User allUser : allUsers) {
            JSONObject jObj = new JSONObject();
            try {
                jObj.put("id", allUser.getId());
                jObj.put("name", allUser.getName());
                jsArray.put(jObj);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return gson.toJson(jsArray);
    }

    public List<User> getAll() {
        allUsers.clear();
        for (Map.Entry<Integer, User> value : userlist.entrySet())
            allUsers.add(value.getValue());
        return allUsers;
    }

}
