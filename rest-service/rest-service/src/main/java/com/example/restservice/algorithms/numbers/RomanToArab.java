package com.example.restservice.algorithms.numbers;

import java.util.Map;

public class RomanToArab {

    private Map<String, Integer> map = Map.of("I", 1, "V", 5, "X", 10, "L", 50, "C", 100, "D", 500, "M", 1000);

    public Integer transform(String nr) {

        int rez = 0, i = 0;
        int final_nr = map.get(String.valueOf(nr.charAt(nr.length() - 1)));
        if (nr.length() >= 2) {
            while (i <= nr.length() - 2) {

                int actual_nr = map.get(String.valueOf(nr.charAt(i)));
                int next_nr = map.get(String.valueOf(nr.charAt(i + 1)));

                if (actual_nr >= next_nr) rez += actual_nr;
                else {
                    rez += next_nr - actual_nr;
                    ++i;
                }
                ++i;
            }

            if (map.get(String.valueOf(nr.charAt(nr.length() - 2))) >= final_nr)
                rez += final_nr;
        } else rez += final_nr;
        return rez;
    }
}