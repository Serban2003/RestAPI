package com.example.restservice;

import java.util.Map;

public class ArabToRoman {

    private Map<Integer, String> map = Map.of(1, "I", 5, "V", 10, "X", 50, "L", 100, "C", 500, "D", 1000, "M");

    public String transform(Integer nr) {

        int nrcif = nr.toString().length();
        int pow = (int) Math.pow(10, nrcif - 1);
        int times = (int) (nr / pow);

        if (nr == 0) return "";
        if (nr == 5 || nr == 50 || nr == 500) return map.get(nr);
        if (nr == 1 || (nr % 10 == 0 && nrcif == 2) || (nr % 100 == 0 && nrcif == 3) || (nr % 1000 == 0 && nrcif == 4)) {

            String rez = "";

            if (times == 4) {
                rez += map.get(pow);
                times = 1;
                nr = 5 * pow;
            }

            if (times == 9) {
                rez += map.get(pow);
                times = 1;
                nr = 10 * pow;
            }
            if (times >= 6 && times <= 8) {
                rez += map.get(5 * pow);
                times -= 5;
                nr -= 5 * pow;
            }

            for (int i = 1; i <= times; ++i)
                rez += map.get(nr / times);

            return rez;
        }

        if (nr <= 3) return transform(nr - 1) + transform(1);
        if (nr == 4 || nr == 9) return transform(1) + transform(nr + 1);
        if (nr <= 9) return transform(5) + transform(nr - 5);
        if (nr / 10 < 10) return transform(nr - nr % 10) + transform(nr % 10);
        if (nr / 100 < 10) return transform(nr - nr % 100) + transform(nr % 100);
        if (nr / 1000 < 10 && nr / 1000 > 0) return transform(nr - nr % 1000) + transform(nr % 1000);

        return "";
    }
}
