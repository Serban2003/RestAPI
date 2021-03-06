package com.example.restservice.algorithms.numbers;

import java.util.*;

public class NumbersSequenceGenerator {
    /**
     * Generates a sequence of numbers
     * - can generate same number multiple times based on frequency -> maximum number of occurences
     * Example: n=100, frequency = 2 => number of distinct numbers = 50
     * - can generate multiple distributions:
     * distribution = { "random", "nearlySorted", "reversed" }
     *
     * @param n
     * @return
     */

    int MAX = 10_000_000;
    ArrayList<Integer> numberList = new ArrayList<>();

    public void generateNumbers(int min, int max) {
        for (int i = min; i <= max; ++i)
            numberList.add(i);
        Collections.shuffle(numberList);
    }

    public Integer[] generate(int numberOfElements, int frequency, String distribution, int minim, int maxim) {

        generateNumbers(minim, maxim);

        ArrayList<Integer> randomNumberList = new ArrayList<>();
        Integer[] finalArray = new Integer[numberOfElements];

        System.out.println("Generating " + distribution + " " + numberOfElements + " numbers" + " of " + frequency + " frequency...");

        if (!distribution.equals("reversed")) {
            int indexOfElements = 0;
            int indexOfList = 0;
            while (indexOfElements <= numberOfElements) {

                int number = numberList.get(indexOfList);

                int j = 0;
                while (j < frequency && j < numberOfElements) {
                    randomNumberList.add(number);
                    ++j;
                    indexOfElements++;
                }
                indexOfList++;
            }
            if (distribution.equals("random"))
                Collections.shuffle(randomNumberList);
        } else {
            int indexOfElements = 0;
            int number = numberList.get(0);

            while (indexOfElements <= numberOfElements) {
                number--;
                int j = 0;
                while (j < frequency && j < numberOfElements) {
                    randomNumberList.add(number);
                    ++j;
                    indexOfElements++;
                }
            }
        }
        for (int i = 0; i < numberOfElements; ++i)
            finalArray[i] = randomNumberList.get(i);

        return finalArray;
    }
}
