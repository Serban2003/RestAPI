package com.example.restservice.algorithms.general;

import com.example.restservice.algorithms.general.EratosthenesSieve;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class EratosthenesSieveTest {

    EratosthenesSieve sieve = new EratosthenesSieve();

    @DisplayName("Should not throw an exception")

    @Test
    void test() {
        sieve.createSieve(1000);
    }
}
