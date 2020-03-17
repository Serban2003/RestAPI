package com.example.restservice;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class QuickSortTest {

    QuickSort array = new QuickSort();

    @DisplayName("Should not throw an exception")

    @Test
    void testall() {

        double total_time = 0.0;
        for (int i = 1; i <= 10; ++i) {

            double time_before = System.nanoTime();

            int[] expected_array = {10, 30, 40, 50, 80, 90};
            int[] v = {10, 80, 30, 90, 40, 50};
            assertArrayEquals(expected_array, array.sorting(v));

            double time_after = System.nanoTime();

            total_time += (time_after - time_before);
        }

        System.out.println((total_time / 10) / 1_000_000);
    }
}
