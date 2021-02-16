package com.example.restservice.controller;


import com.example.restservice.algorithms.general.AlgorithmsGenerator;
import com.example.restservice.algorithms.general.EratosthenesSieve;
import com.example.restservice.algorithms.numbers.ArabToRoman;
import com.example.restservice.algorithms.numbers.NumbersSequenceGenerator;
import com.example.restservice.algorithms.numbers.RomanToArab;
import com.example.restservice.db.CustomDb;
import com.example.restservice.dto.AlgorithmExecutionDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.hibernate.validator.constraints.pl.REGON;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Random;
import java.util.StringJoiner;

@Controller
public class AlgorithmsController {
    @Autowired
    private CustomDb db;

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
    @PostMapping("/algorithms/execution")
    public void insertNewExecution(@RequestBody AlgorithmExecutionDTO algorithm) throws JsonProcessingException {
        db.insert(algorithm);
    }

    @PostMapping("/algorithms/getAll")
    public void getAllExecutions(){
        db.getAll();
    }

    @PostMapping("/algorithms/searchById")
    public AlgorithmExecutionDTO searchById(@RequestParam(name = "id", required = true, defaultValue = "") Long id) throws IOException, JSONException {
        return db.searchById(id);
    }

    @PostMapping("/algorithms/delete")
    public void deleteExecution(@RequestParam(name = "id", required = true, defaultValue = "") Long id) throws IOException {
        db.delete(id);
    }

    @PostMapping("/algorithms/generate")
    public void generateAlgorithms(@RequestParam(name = "tests", required = true, defaultValue = "1") Long test) throws JsonProcessingException {

        AlgorithmsGenerator generator = new AlgorithmsGenerator();
        for(int i = 1; i <= test; ++i){
            db.insert(generator.createAlgorithms());
        }
    }

}
