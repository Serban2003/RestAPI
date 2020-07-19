package com.example.restservice;


import org.junit.jupiter.api.Test;

public class UniversalControllerTest {

    @Test
    public void testType(){
        Integer id = 5;

        Class<?> idClass = id.getClass();

        System.out.println(idClass.getName());
    }
}


