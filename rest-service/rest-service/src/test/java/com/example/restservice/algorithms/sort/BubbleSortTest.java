package com.example.restservice.algorithms.sort;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class BubbleSortTest {

    BubbleSort sortedArray = new BubbleSort();

    @DisplayName("Should not throw an exception")

    @Test
    void testAll() {

        double totalTime = 0.0;
        for (int i = 1; i <= 10; ++i) {

            double timeBefore = System.nanoTime();

            Integer[] expectedArray = new Integer[]{10, 30, 40, 50, 80, 90};
            Integer[] array = new Integer[]{10, 80, 30, 90, 40, 50};
            assertArrayEquals(expectedArray, sortedArray.sorting(array));

            totalTime += (System.nanoTime() - timeBefore);
        }

        System.out.println((totalTime / 10) / 1_000_000 + " ms.");
    }
}
