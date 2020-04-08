package com.example.restservice.algorithms.numbers;

import java.util.Map;

public class ArabToRoman {

    private Map<Integer, String> map = Map.of(1, "I", 5, "V", 10, "X", 50, "L", 100, "C", 500, "D", 1000, "M");

    public String transform(Integer number) {

        int numberOfDigits = number.toString().length();
        int power = (int) Math.pow(10, numberOfDigits - 1);
        int times = number / power;

        if (number == 0) return "";
        if (number == 5 || number == 50 || number == 500) return map.get(number);
        if (number == 1 || (number % 10 == 0 && numberOfDigits == 2) || (number % 100 == 0 && numberOfDigits == 3) || (number % 1000 == 0 && numberOfDigits == 4)) {

            StringBuilder result = new StringBuilder();

            if (times == 4) {
                result.append(map.get(power));
                times = 1;
                number = 5 * power;
            }

            if (times == 9) {
                result.append(map.get(power));
                times = 1;
                number = 10 * power;
            }
            if (times >= 6 && times <= 8) {
                result.append(map.get(5 * power));
                times -= 5;
                number -= 5 * power;
            }

            for (int i = 1; i <= times; ++i)
                result.append(map.get(number / times));

            return result.toString();
        }

        if (number <= 3) return transform(number - 1) + transform(1);
        if (number == 4 || number == 9) return transform(1) + transform(number + 1);
        if (number <= 9) return transform(5) + transform(number - 5);
        if (number / 10 < 10) return transform(number - number % 10) + transform(number % 10);
        if (number / 100 < 10) return transform(number - number % 100) + transform(number % 100);
        if (number / 1000 < 10 && number / 1000 > 0) return transform(number - number % 1000) + transform(number % 1000);

        return "";
    }
}
