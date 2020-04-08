package com.example.restservice.algorithms.sort;

public class BubbleSort implements Sort {

    public Integer[] sorting(Integer[] array) {

        int mut = 1;

        while (mut != 0) {
            mut = 0;
            for (int i = 0; i <= array.length - 2; i++) {

                if (array[i] > array[i + 1]) {
                    int aux = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = aux;
                    mut++;
                }
            }

        }
        return array;
    }
}