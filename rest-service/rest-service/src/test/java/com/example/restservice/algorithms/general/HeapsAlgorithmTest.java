package com.example.restservice.algorithms.general;

import com.example.restservice.algorithms.general.HeapsAlgorithm;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class HeapsAlgorithmTest {

    HeapsAlgorithm perm = new HeapsAlgorithm();

    @DisplayName("Should not throw an exception")

    @Test
    void test()
    {
        perm.permutation(10 , 1);
    }
}