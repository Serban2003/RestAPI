package com.example.restservice.controller;


import com.example.restservice.algorithms.general.EratosthenesSieve;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;
import java.util.StringJoiner;

@Controller
public class AlgorithmsController {

    @ResponseBody
    @PostMapping("/algorithms/randomNumberGenerator")
    public int getRandomNumber(@RequestParam(name="firstNumber", required = true, defaultValue = "0") int firstNumber, @RequestParam(name="secondNumber", required = true, defaultValue = "0") int secondNumber) {
        Random randomNumber = new Random();
        return randomNumber.nextInt(secondNumber - firstNumber + 1) + firstNumber;
    }

    @ResponseBody
    @PostMapping("/algorithms/nthPrimeNumber")
    public int getNthPrimeNumber(@RequestParam(name="number", required = true, defaultValue = "0") int number) {
        EratosthenesSieve sieve = new EratosthenesSieve();
        return sieve.createSieve(100000000)[number];
    }

    @ResponseBody
    @PostMapping("/algorithms/primeNumbers")
    public String getPrimeNumbers(@RequestParam(name="number", required = true, defaultValue = "0") int number) {
        EratosthenesSieve sieve = new EratosthenesSieve();
        StringJoiner result = new StringJoiner(", ");

        int[] primeNumbers = sieve.createSieve(100000000);

        for(int i = 1; i<=number; ++i)
            result.add(Integer.toString(primeNumbers[i]));

        System.out.println(result);
        return result.toString();
    }
}
