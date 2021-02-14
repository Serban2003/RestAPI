package com.example.restservice.matrix;

import java.util.Random;

public class Matrix {
    double[][] mat;
    int n, m;

    public Matrix(int n, int m){
        this.n = n;
        this.m = m;
        mat = new double[n][m];
    }

    public Matrix(double v[][]){
        n = v.length;
        m = v[0].length;
        mat = new double[n][m];

        for(int i = 0; i < n; ++i)
            System.arraycopy(v[i], 0, mat[i], 0, v[i].length);
    }

    public Matrix add(Matrix matrix){
        if(n != matrix.n && m != matrix.m) throw new IllegalArgumentException("The matrices don't have the same size");
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < m; ++j)
                mat[i][j] += matrix.mat[i][j];

        return this;
    }

    public Matrix subtract(Matrix matrix){
        if(n != matrix.n && m != matrix.m) throw new IllegalArgumentException("The matrices don't have the same size");
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < m; ++j)
                mat[i][j] -= matrix.mat[i][j];

        return this;
    }

    public Matrix product(Matrix matrix){
        if(n != matrix.m && m != matrix.n) throw new IllegalArgumentException("The matrices don't have the same size");
        matrix.transpose();

        Matrix result = new Matrix(n, m);

        for(int i = 0; i < n; ++i){
            int sum = 0;
            for(int t = 0; t < m; ++t){
                sum = 0;
                for(int j = 0; j < m; ++j)
                    sum += mat[i][j] * matrix.mat[i][j];
                result.mat[i][t] = sum;
            }
        }
        return result;
    }

    public Matrix transpose(){
        double[][] matCopy = this.mat;
        this.mat = new double[m][n];
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j)
                this.mat[i][j] = matCopy[j][i];
        int aux = n;
        n = m;
        m = aux;

        return this;
    }

    public double calculateDeterminant(){
        if(n != m) throw new IllegalArgumentException("The matrix isn't square");

        if(n == 1) return mat[0][0];
        if(n == 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];

        double determinant = 0.0;
        for(int k = 0; k < n; ++k){
            double product = 1.0;
            for(int i = k; i < n + k; ++i)
                product *= mat[i % n][i  - k];
            determinant += product;
        }

        for(int k = 0; k < n; ++k){
            double product = 1.0;
            for(int i = k; i < n + k; ++i)
                product *= mat[i % n][n - i + k - 1];
            determinant -= product;
        }
        return determinant;
    }

    public double[][] calculateInverse(){
        double determinant = calculateDeterminant();

        if(determinant == 0) throw new IllegalArgumentException("The matrix is 'Singular' (determinant = 0)");

        if(n == 2){
            double aux = mat[0][0];
            mat[0][0] = mat[1][1] * determinant;
            mat[1][1] = aux * determinant;
            mat[0][1] *= -determinant;
            mat[1][0] *= -determinant;
        }
        return mat;
    }

    public Matrix generate(int n, int m, int min, int max){
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < m; ++j)
                mat[i][j] = min + (Math.random() * (max - min + 1));

        return this;
    }

    public String toString(){
        StringBuilder builder = new StringBuilder();

        for(int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j)
                builder.append(mat[i][j]).append(" ");
            builder.append('\n');
        }
        return builder.toString();
    }
}
