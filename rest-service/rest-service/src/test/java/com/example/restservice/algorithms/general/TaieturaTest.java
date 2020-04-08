package com.example.restservice.algorithms.general;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class TaieturaTest {

    private Taietura cut = new Taietura();

    @DisplayName("Should not throw an exception")

    @Test
    void testAll() {
        double timeBefore = System.nanoTime();

        int[] array = {2, -2, 0, 0, 1, -1};
        int[] expectedArray = {4, 4, 6, 6, 4, 4};

        assertArrayEquals(expectedArray, cut.cuts(array));

        System.out.println(( System.nanoTime() - timeBefore) / 1_000_000 + " ms.");
    }
}
