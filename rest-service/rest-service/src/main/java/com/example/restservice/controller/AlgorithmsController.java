package com.example.restservice.controller;


import com.example.restservice.algorithms.classes.RandomNumber;
import com.example.restservice.dao.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Random;

@Controller
public class AlgorithmsController {

    @ResponseBody
    @PostMapping("/algorithms/randomNumberGenerator/")
    public int getRandomNumber(@RequestBody RandomNumber number) {
        Random randomNumber = new Random();
        return randomNumber.nextInt(number.getSecondNumber() - number.getFirstNumber() + 1) + number.getFirstNumber();
    }
}
