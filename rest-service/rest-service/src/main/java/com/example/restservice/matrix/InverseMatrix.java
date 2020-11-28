package com.example.restservice.matrix;

public class InverseMatrix {
    Matrix inv;
    int n, m;

    public InverseMatrix(Matrix matrix){
        if(matrix.n != matrix.m) throw new IllegalArgumentException("The matrix isn't square");

        inv = new Matrix(matrix.n, matrix.m);
        n = matrix.n; m = matrix.m;

        for(int i = 0; i < n; ++i)
            inv.mat[i][i] = 1;
    }

    public Matrix getInverseByGaussian(Matrix matrix){

        if(matrix.n != matrix.m) throw new IllegalArgumentException("The matrix isn't square");

        for(int i = 1; i < n; ++i){
            boolean isNegative = false;
            for(int j = 0; j < m; ++j){
                matrix.mat[i][j] -= matrix.mat[0][j];
                inv.mat[i][j] -= inv.mat[0][j];

                if(matrix.mat[i][j] < 0) isNegative = true;
            }

            if(isNegative)
                for(int j = 0; j < m; ++j) {
                    if(matrix.mat[i][j] != 0) matrix.mat[i][j] *= -1;
                    if(inv.mat[i][j] != 0) inv.mat[i][j] *= -1;
                }
        }

        for(int k = 1; k < n; ++k)
            for(int i = n - k - 1; i >= 0; --i){
                double times = matrix.mat[i][m - k]; // i = n - k; j = m - k;

                for(int j = m - 1; j > n - k - 1; --j)
                    matrix.mat[n - k][m - k] = 0;

                for(int j = 0; j < m; ++j)
                    inv.mat[i][j] -= inv.mat[n - k][j] * times;
        }

        return inv;
    }

    public String toString(){
        StringBuilder builder = new StringBuilder();

        for(int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j)
                builder.append(inv.mat[i][j]).append(" ");
            builder.append('\n');
        }
        return builder.toString();
    }
}
