package com.example.restservice.algorithms.numbers;

import java.util.Map;

public class RomanToArab {

    private Map<String, Integer> map = Map.of("I", 1, "V", 5, "X", 10, "L", 50, "C", 100, "D", 500, "M", 1000);

    public Integer transform(String number) {

        int result = 0, i = 0;
        int finalNumber = map.get(String.valueOf(number.charAt(number.length() - 1)));
        if (number.length() >= 2) {
            while (i <= number.length() - 2) {

                int actualNumber = map.get(String.valueOf(number.charAt(i)));
                int nextNumber = map.get(String.valueOf(number.charAt(i + 1)));

                if (actualNumber >= nextNumber) result += actualNumber;
                else {
                    result += nextNumber - actualNumber;
                    ++i;
                }
                ++i;
            }

            if (map.get(String.valueOf(number.charAt(number.length() - 2))) >= finalNumber)
                result += finalNumber;
        } else result += finalNumber;
        return result;
    }
}