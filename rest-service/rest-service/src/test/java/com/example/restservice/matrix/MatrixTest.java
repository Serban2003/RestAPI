package com.example.restservice.matrix;

import org.junit.Test;

import static org.junit.jupiter.api.Assertions.*;

public class MatrixTest {

    @Test
    public void testToString(){
        assertEquals("1.0 2.0 \n" + "2.0 3.0 \n", new Matrix(new double[][] {{1, 2}, {2, 3}}).toString());
    }
    @Test
    public void testInitialization(){
        assertEquals("0.0 0.0 \n" + "0.0 0.0 \n", new Matrix(2,2).toString());
    }

    @Test
    public void testAddMatrix(){
        Matrix matrix1 = new Matrix(new double[][]{{2, 5}, {4, 5}});
        Matrix matrix2 = new Matrix(new double[][]{{3, 7},{6, 9}});
        assertEquals("5.0 12.0 \n" + "10.0 14.0 \n", matrix1.add(matrix2).toString());
    }
    @Test
    public void testSubtractMatrix(){
        Matrix matrix1 = new Matrix(new double[][]{{2, 5}, {4, 5}});
        Matrix matrix2 = new Matrix(new double[][]{{3, 7},{6, 9}});
        assertEquals("-1.0 -2.0 \n" + "-2.0 -4.0 \n", matrix1.subtract(matrix2).toString());
    }
    @Test
    public void testTranspose(){
        Matrix matrix = new Matrix(new double[][]{{2, 5, 3}, {4, 5, 9}});
        assertEquals("2.0 4.0 \n" + "5.0 5.0 \n" + "3.0 9.0 \n", matrix.transpose().toString());
    }

    @Test
    public void testProductMatrix(){
        Matrix matrix1 = new Matrix(new double[][]{{2, 5}});
        Matrix matrix2 = new Matrix(new double[][]{{3}, {6}});
        assertEquals("36.0 36.0 \n", matrix1.product(matrix2).toString());
    }

    @Test
    public void testInverse(){
        Matrix matrix = new Matrix(new double[][]{{1, 1, 3}, {1, 2, 4}, {1, 1, 2}});
        InverseMatrix result = new InverseMatrix(matrix);
        assertEquals("0.0 -1.0 2.0 \n" + "-2.0 1.0 1.0 \n" + "1.0 0.0 -1.0 \n", result.getInverseByGaussian(matrix).toString());
    }

    @Test
    public void testComplexity(){
        for(int i = 1; i <= 150; ++i){

            double totalTime = 0.0;
            for(int j = 1; j <= 10; ++j){
                Matrix matrix1 = new Matrix(i, i);
                Matrix matrix2 = new Matrix(i, i);

                matrix1.generate(i, i, -100, 100);
                matrix2.generate(i, i, -100, 100);

                double timeBefore = System.nanoTime();

                matrix1.product(matrix2);

                totalTime += (System.nanoTime() - timeBefore);
            }
            System.out.println("Multiplying matrices of size " + i + ": " + totalTime / 10 / 1_000_000 + " ms.");
        }
    }
}