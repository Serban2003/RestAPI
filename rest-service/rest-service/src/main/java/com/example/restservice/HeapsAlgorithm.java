package com.example.restservice;

public class HeapsAlgorithm {

    int[] fol = new int[32];
    int[] perm = new int[32];

    void permutation(int n, int k) {

        if (k == n + 1) {
            for (int i = 1; i <= n; ++i)
                System.out.print(perm[i] + " ");
            System.out.print("\n");
        }

        for (int j = 1; j <= n; j++)
            if (fol[j] == 0) {
                perm[k] = j;
                fol[j] = 1;
                permutation(n, k + 1);
                fol[j] = 0;
            }
    }

}
