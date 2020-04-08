package com.example.restservice.algorithms.general;

public class Taietura {

    int[] IncidenceOfSumAfterCut = new int[200000000];
    int[] IncidenceOfSumBeforeCut = new int[200000000];

    int partialSum = 0, k = 0, value = 0;

    public int[] cuts(int[] array) {

        int[] result = new int[array.length];

        for (int value : array) {
            partialSum += value;
            IncidenceOfSumAfterCut[partialSum]++;
        }
        partialSum = 0;
        for (int value : array) {
            value += IncidenceOfSumAfterCut[partialSum] - IncidenceOfSumBeforeCut[partialSum];
            result[k++] = value;
            IncidenceOfSumAfterCut[partialSum]--;
            partialSum += value;
            IncidenceOfSumBeforeCut[partialSum]++;
        }
        return result;
    }
}
