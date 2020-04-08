package com.example.restservice.algorithms.general;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class HeapsAlgorithmTest {

    HeapsAlgorithm permutation = new HeapsAlgorithm();

    @DisplayName("Should not throw an exception")

    @Test
    void test()
    {
        permutation.createPermutation(10 , 1);
    }
}
