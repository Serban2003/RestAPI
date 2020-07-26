package com.example.restservice.controller;


import com.example.restservice.algorithms.general.EratosthenesSieve;
import com.example.restservice.algorithms.numbers.ArabToRoman;
import com.example.restservice.algorithms.numbers.NumbersSequenceGenerator;
import com.example.restservice.algorithms.numbers.RomanToArab;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;
import java.util.StringJoiner;

@Controller
public class AlgorithmsController {

    @ResponseBody
    @PostMapping("/algorithms/randomNumberGenerator")
    public int getRandomNumber(@RequestParam(name = "minim", required = true, defaultValue = "0") int minim, @RequestParam(name = "maxim", required = true, defaultValue = "0") int maxim) {
        Random randomNumber = new Random();
        return randomNumber.nextInt(maxim - minim + 1) + minim;
    }

    @ResponseBody
    @PostMapping("/algorithms/nthPrimeNumber")
    public int getNthPrimeNumber(@RequestParam(name = "number", required = true, defaultValue = "0") int number) {
        EratosthenesSieve sieve = new EratosthenesSieve();
        return sieve.createSieve(100000000)[number];
    }

    @ResponseBody
    @PostMapping("/algorithms/sequenceGenerator")
    public String generateSequence(@RequestParam(name = "number", required = true, defaultValue = "1") int number, @RequestParam(name = "distribution", required = true, defaultValue = "random") String distribution, @RequestParam(name = "frequency", required = true, defaultValue = "1") int frequency, @RequestParam(name = "minim", required = true, defaultValue = "0") int minim, @RequestParam(name = "maxim", required = true, defaultValue = "0") int maxim) {

        if (frequency * (maxim - minim + 1) >= number) {
            NumbersSequenceGenerator sequence = new NumbersSequenceGenerator();
            StringJoiner result = new StringJoiner(", ");

            Integer[] generatedSequence = sequence.generate(number, frequency, distribution, minim, maxim);

            for (Integer integer : generatedSequence) result.add(Integer.toString(integer));
            return result.toString();
        }
        return "invalid input";
    }

    @ResponseBody
    @PostMapping("/algorithms/primeNumbers")
    public String getPrimeNumbers(@RequestParam(name = "number", required = true, defaultValue = "0") int number) {
        EratosthenesSieve sieve = new EratosthenesSieve();
        StringJoiner result = new StringJoiner(", ");

        int[] primeNumbers = sieve.createSieve(100000000);

        for (int i = 1; i <= number; ++i)
            result.add(Integer.toString(primeNumbers[i]));

        return result.toString();
    }

    @ResponseBody
    @PostMapping("/algorithms/arabToRoman")
    public String transformArabToRoman(@RequestParam(name = "number", required = true, defaultValue = "0") int number) {
        ArabToRoman romanNumber = new ArabToRoman();
        return romanNumber.transform(number);
    }

    @ResponseBody
    @PostMapping("/algorithms/romanToArab")
    public int transformRomanToArab(@RequestParam(name = "number", required = true, defaultValue = "") String number) {
        if (number.matches("[a-zA-Z]+")) {
            RomanToArab arabNumber = new RomanToArab();
            return arabNumber.transform(number.toUpperCase());
        }
        return 0;
    }
}
