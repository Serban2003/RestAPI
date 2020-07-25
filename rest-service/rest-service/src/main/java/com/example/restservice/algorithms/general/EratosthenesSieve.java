package com.example.restservice.algorithms.general;

public class EratosthenesSieve {

    boolean[] sieve = new boolean[1000000000];
    public int[] prime = new int[10000000];
    int k = 0;

    public int[] createSieve(int n) {
        for (int i = 2; i <= n; ++i)
            if (!sieve[i]) {
                prime[++k] = i;
                for (int j = i + i; j <= n; j += i)
                    sieve[j] = true;
            }
        return prime;
    }
}
