package com.example.restservice.algorithms.general;

public class HeapsAlgorithm {

    int[] usedNumber = new int[32];
    int[] perm = new int[32];

    void createPermutation(int numberOfDistinctDigits, int initialDigit) {

        if (initialDigit == numberOfDistinctDigits + 1) {
            for (int i = 1; i <= numberOfDistinctDigits; ++i)
                System.out.print(perm[i] + " ");
            System.out.print("\n");
        }

        for (int j = 1; j <= numberOfDistinctDigits; j++)
            if (usedNumber[j] == 0) {
                perm[initialDigit] = j;
                usedNumber[j] = 1;
                createPermutation(numberOfDistinctDigits, initialDigit + 1);
                usedNumber[j] = 0;
            }
    }
}
