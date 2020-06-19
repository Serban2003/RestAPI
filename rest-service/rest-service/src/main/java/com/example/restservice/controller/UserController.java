package com.example.restservice.controller;

import com.example.restservice.dao.User;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


@Controller
public class UserController {

    Long id = 1L;

    private Map<Long, User> userlist = new HashMap<Long, User>();
    private static final Logger logger = LoggerFactory.getLogger(GreetingController.class);

    @ResponseBody
    @PostMapping("/user/")
    public User create(@RequestBody User user) {
        user.setId(id);
        id++;
        logger.debug("Creating user: id = " + user.getId() + " name = " + user.getName());
        userlist.put(user.getId(), user);
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
    }

    @ResponseBody
    @RequestMapping(value = "user/allusers/")
    protected String doGet() {
        JSONArray jsArray = new JSONArray();
        Gson gson = new Gson();

        for (Map.Entry<Long, User> value : userlist.entrySet()) {
            JSONObject jObj = new JSONObject();
            try {
                jObj.put("id", value.getValue().getId());
                jObj.put("name", value.getValue().getName());
                jsArray.put(jObj);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return gson.toJson(jsArray);
    }


}
