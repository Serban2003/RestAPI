package com.example.restservice.algorithms.numbers;

import org.junit.Before;

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
    ArrayList<Integer> randomNumberList = new ArrayList<>();


    @Before
    public void generateNumbers() {
        for (int i = 0; i < MAX; ++i)
            numberList.add(i);
    }

    public Integer[] generate(int numberOfElements, int frequency, String distribution) {

        Integer[] finalArray = new Integer[numberOfElements];

        System.out.println("Generating " + distribution + " " + numberOfElements + " numbers" + " of " + frequency + " frequency...");

        Collections.shuffle(numberList);
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
        }
        else{
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

        for(int i=0; i<numberOfElements; ++i)
            finalArray[i]=randomNumberList.get(i);
        return finalArray;
    }
}
