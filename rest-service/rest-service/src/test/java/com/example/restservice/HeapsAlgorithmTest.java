package com.example.restservice;

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
