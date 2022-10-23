package com.example.restservice.algorithms.numbers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BinaryConverter {

    Map<String, String> dict = Map.of("10", "A", "11", "B", "12", "C", "13", "D", "14", "E", "15", "F");
    Map<String, Integer> dictRev = Map.of( "A", 10, "B", 11, "C", 12, "D", 13, "E", 14, "F", 15);

    String number, primaryBase, finalBase;
    String integerPart = "0";
    String fractionalPart = "0";

    public BinaryConverter(String number, String primaryBase, String finalBase) {
        this.number = number;
        this.primaryBase = primaryBase;
        this.finalBase = finalBase;
    }

    public String convertNumber() {
        expandNumber();

        switch (primaryBase) {
            case "Decimal": {
                switch (finalBase) {
                    case "Decimal":
                        return number;
                    case "Binary":
                        return decimalToBase(2);
                    case "Octal":
                        return decimalToBase(8);
                    case "Hexadecimal":
                        return decimalToBase(16);
                    default:
                        return "";
                }
            }
            case "Binary": {
                switch (finalBase) {
                    case "Decimal": return  baseToDecimal(2);
                    case "Binary": return number;
                    case "Octal":{
                        baseToDecimal(8);
                        return decimalToBase(8);
                    }
                    case "Hexadecimal":{
                        baseToDecimal(16);
                        return decimalToBase(16);
                    }
                    default:
                        return "";
                }
            }
        }
        return "";
    }

    public void expandNumber() {
        int i = 0;
        while (i < number.length() && number.charAt(i) != '.' && number.charAt(i) != ',') i++;

        integerPart = number.substring(0, i);
        if (i == number.length()) fractionalPart = null;
        else fractionalPart = number.substring(i + 1);

    }

    public String decimalToBase(int base) {
        StringBuilder result = new StringBuilder();

        int decInt = Integer.parseInt(integerPart);
        ArrayList<Integer> integerQuotient = new ArrayList<>();

       do {
            integerQuotient.add(decInt % base);
            decInt /= base;
        } while (decInt != 0);

        for (int i = integerQuotient.size() - 1; i >= 0; --i)
            if (integerQuotient.get(i) >= 10)
                result.append(dict.get(integerQuotient.get(i).toString()));
            else result.append(integerQuotient.get(i));

        if (fractionalPart != null) {
            result.append(',');
            int decFra = Integer.parseInt(fractionalPart);
            ArrayList<Integer> fractionalQuotient = new ArrayList<>();

            do {
                fractionalQuotient.add(decFra % base);
                decFra /= base;
            } while (decFra != 0);

            for (int i = fractionalQuotient.size() - 1; i >= 0; --i)
                if (fractionalQuotient.get(i) >= 10)
                    result.append(dict.get(fractionalQuotient.get(i).toString()));
                else result.append(fractionalQuotient.get(i));
        }

        return result.toString();
    }

    public String baseToDecimal(int base) {

        StringBuilder result = new StringBuilder();
        int decInt = 0;

        for(int i = 0; i < integerPart.length(); ++i)
            if(integerPart.charAt(i) <= '9') decInt += Integer.parseInt(String.valueOf(integerPart.charAt(i))) * (int) Math.pow(base, integerPart.length() - i - 1);
            else decInt += dictRev.get(String.valueOf(integerPart.charAt(i))) * (int) Math.pow(base, integerPart.length() - i - 1);

        integerPart = Integer.toString(decInt);
        result.append(integerPart);

        double decFra = 0;
        if (fractionalPart != null) {
            result.append(',');


            for(int i = 0; i < fractionalPart.length(); ++i)
                if(fractionalPart.charAt(i) == '1')
                    decFra += Math.pow((double) 1 / base, fractionalPart.length() - i - 1);

            fractionalPart = Double.toString(decFra).substring(2);
            result.append(decFra);
        }

        return result.toString();
    }
}
