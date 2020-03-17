package com.example.restservice;

public class QuickSort {

    public int[] sorting(int[] array) {

        quicksort(array, 0, array.length - 1);

        return array;
    }

    void quicksort(int[] array, int stg, int drp) {

        if (stg < drp) {
            int indx = partition(array, stg, drp);

            quicksort(array, stg, indx - 1);
            quicksort(array, indx + 1, drp);
        }
    }

    int partition(int[] array, int stg, int drp) {

        int pivot = array[drp];
        int indx = stg - 1;

        for (int i = stg; i <= drp - 1; ++i)
            if (pivot > array[i]) {
                indx++;

                int aux = array[indx];
                array[indx] = array[i];
                array[i] = aux;
            }

        int aux = array[indx + 1];
        array[indx + 1] = array[drp];
        array[drp] = aux;

        return indx + 1;
    }
}
