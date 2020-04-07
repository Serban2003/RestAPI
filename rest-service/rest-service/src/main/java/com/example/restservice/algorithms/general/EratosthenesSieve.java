package com.example.restservice.algorithms.general;

public class EratosthenesSieve {

    boolean[] sieve = new boolean[1000000000];
    int[] prime = new int[1000000];
    int k = 0;

    void createSieve(int n) {
        for (int i = 2; i <= n; ++i)
            if (!sieve[i]) {
                prime[++k] = i;
                for (int j = i + i; j <= n; j += i)
                    sieve[j] = true;
            }

        for (int i = 1; i <= k; ++i)
            System.out.print(prime[i] + " ");
    }
}
