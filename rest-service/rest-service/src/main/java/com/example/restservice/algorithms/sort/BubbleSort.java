package com.example.restservice.algorithms.sort;

public class BubbleSort implements Sort {

    public Integer[] sorting(Integer[] array) {

        int moves = 1;
        while (moves != 0) {
            moves = 0;
            for (int i = 0; i <= array.length - 2; i++) {

                if (array[i] > array[i + 1]) {
                    int aux = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = aux;
                    moves++;
                }
            }
        }
        return array;
    }
}
