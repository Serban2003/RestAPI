package com.example.restservice.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Controller
public class AlgorithmsController {

    @ResponseBody
    @PostMapping("/algorithms/randomNumberGenerator")
    public int getRandomNumber(@RequestParam(name="firstNumber", required = true, defaultValue = "0") int firstNumber, @RequestParam(name="secondNumber", required = true, defaultValue = "0") int secondNumber) {
        Random randomNumber = new Random();
        return randomNumber.nextInt(secondNumber - firstNumber + 1) + firstNumber;
    }
}
