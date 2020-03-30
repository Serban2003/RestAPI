package com.example.restservice;

public class Taietura {

    int[] frecv1 = new int[200000000];
    int[] frecv2 = new int[200000000];

    int suma1 = 0, s = 0, k = 0, val = 0;

    public int[] taieturi(int[] x) {

        int[] rez = new int[x.length];

        for (int value : x) {
            suma1 += value;
            frecv1[suma1]++;
        }
        suma1 = 0;
        for (int value : x) {
            val += frecv1[suma1] - frecv2[suma1];
            rez[k++] = val;
            frecv1[suma1]--;
            suma1 += value;
            frecv2[suma1]++;
        }
        return rez;
    }
}
