package com.example.restservice.algorithms;

import com.example.restservice.algorithms.Taietura;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class TaieturaTest {

    private Taietura taietura = new Taietura();

    @DisplayName("Should not throw an exception")

    @Test
    void testall() {
        double time_before = System.nanoTime();

        int[] v = {2, -2, 0, 0, 1, -1};
        int[] expected_array = {4, 4, 6, 6, 4, 4};

        assertArrayEquals(expected_array, taietura.taieturi(v));

        double time_after = System.nanoTime();

        System.out.println((time_after - time_before) / 1_000_000);
    }
}
