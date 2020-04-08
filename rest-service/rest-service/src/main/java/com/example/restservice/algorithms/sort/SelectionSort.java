package com.example.restservice.algorithms.sort;

public class SelectionSort implements Sort{

    public Integer[] sorting(Integer[] array) {

        int poz = 0, k = 0;

        for (int i = 0; i <= array.length - 2; i++) {

            int indx_minim = i;

            for (int j = i + 1; j <= array.length - 1; ++j)
                if (array[j] < array[indx_minim])
                    indx_minim = j;

            int aux = array[i];
            array[i] = array[indx_minim];
            array[indx_minim] = aux;
        }

        return array;
    }
}
