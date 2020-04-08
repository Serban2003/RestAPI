package com.example.restservice.algorithms.sort;

public class SelectionSort implements Sort {

    public Integer[] sorting(Integer[] array) {

        for (int i = 0; i <= array.length - 2; i++) {

            int indexMinim = i;

            for (int j = i + 1; j <= array.length - 1; ++j)
                if (array[j] < array[indexMinim])
                    indexMinim = j;

            int aux = array[i];
            array[i] = array[indexMinim];
            array[indexMinim] = aux;
        }

        return array;
    }
}
