package com.example.restservice.controller;


import com.example.restservice.algorithms.general.AlgorithmsGenerator;
import com.example.restservice.algorithms.general.EratosthenesSieve;
import com.example.restservice.algorithms.general.RandomPerson;
import com.example.restservice.algorithms.numbers.ArabToRoman;
import com.example.restservice.algorithms.numbers.BinaryConverter;
import com.example.restservice.algorithms.numbers.NumbersSequenceGenerator;
import com.example.restservice.algorithms.numbers.RomanToArab;
import com.example.restservice.db.CustomDb;
import com.example.restservice.dto.AlgorithmExecutionDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.hibernate.validator.constraints.pl.REGON;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Random;
import java.util.StringJoiner;

@Controller
public class AlgorithmsController {

    private static final Logger logger = LoggerFactory.getLogger(AlgorithmsController.class);

    @Autowired
    private CustomDb db;
    RandomPerson person = new RandomPerson();

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
    @PostMapping("/algorithms/binaryConverter")
    public String convertBinaryNumber(@RequestParam(name = "number", required = true, defaultValue = "0") String number, @RequestParam(name = "primaryBase", required = true, defaultValue = "Binary") String primaryBase, @RequestParam(name = "finalBase", required = true, defaultValue = "Binary") String finalBase) {
        BinaryConverter binaryConverter = new BinaryConverter(number, primaryBase, finalBase);
        return binaryConverter.convertNumber();
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

    @ResponseBody
    @PostMapping("/algorithms/randomPersonPicker")
    public String getRandomPerson() {
        return person.getRandomPerson();
    }


    @PostMapping("/algorithms/execution")
    public void insertNewExecution(@RequestBody AlgorithmExecutionDTO algorithm) throws JsonProcessingException {
        db.insert(algorithm);
    }

    @PostMapping("/algorithms/getAll")
    public void getAllExecutions(@RequestParam(name = "number", required = true, defaultValue = "-1") Long number){
        double timeBefore = System.nanoTime();
        db.getAll(number);

        logger.info((System.nanoTime() - timeBefore) / 1_000_000 + " ms");
    }
    /**
     * 10.000 - 2208,4778 ms - 2,2 s
     * 100.000 - 7556,1161 ms - 7,55 s
     * 200.000 - 13545,559 ms - 13,54 s
     * 300.000 - 19748,5466 ms - 19,74 s
     * 400.000 - 25399,6063 ms - 25,39 s
     * 500.000 - 31823,9709 ms - 31,82 s
     * 600.000 - 39738,7963 ms - 39,73 s
     * 700.000 - 45036,8879 ms - 45,03 s
    */

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
            logger.info("Algorithm " + i + " generated.");
        }
    }

}
