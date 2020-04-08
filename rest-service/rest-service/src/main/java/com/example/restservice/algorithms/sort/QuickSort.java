package com.example.restservice.algorithms.sort;

public class QuickSort implements Sort{

    public Integer[] sorting(Integer[] array) {

        quicksort(array, 0, array.length - 1);

        return array;
    }

    void quicksort(Integer[] array, int left, int right) {

        if (left < right) {
            int index = partition(array, left, right);

            quicksort(array, left, index - 1);
            quicksort(array, index + 1, right);
        }
    }

    int partition(Integer[] array, int left, int right) {

        int pivot = array[right];
        int index = left - 1;

        for (int i = left; i <= right - 1; ++i)
            if (pivot > array[i]) {
                index++;

                int aux = array[index];
                array[index] = array[i];
                array[i] = aux;
            }

        int aux = array[index + 1];
        array[index + 1] = array[right];
        array[right] = aux;

        return index + 1;
    }
}
