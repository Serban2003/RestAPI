package com.example.restservice;

import com.example.restservice.dao.User;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class UniversalControllerTest {
    User user = new User();

    @Test
    public void generateQuery() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {

        user.setFirstname("Serban");
        user.setLastname("Iustinian");
        user.setEmail("iustinianserban@gmail.com");
        user.setPassword("parola");
        user.setBilling_address_id(1L);
        user.setShipping_address_id(1L);

        Class clazz = user.getClass();
        String className = clazz.getSimpleName();

        final Field[] fields = clazz.getDeclaredFields();
        String field = "";
        String getConstructor = "";

        for (int i = 1; i < fields.length; ++i) {
            field += ("`" + fields[i].getName() + "`");

            String var = fields[i].getName();


            Method sumInstanceMethod
                    = clazz.getMethod("get" + var.substring(0, 1).toUpperCase() + var.substring(1));

            String result
                    = (String) sumInstanceMethod.invoke(user);
            System.out.println(result);
            getConstructor += ("'" + className.toLowerCase() + ".get" + var.substring(0, 1).toUpperCase() + var.substring(1) + "()" + "'");
            if (i < fields.length - 1) {
                field += ",";
                getConstructor += ",";
            }
        }

//        System.out.println(field);
//        System.out.println(getConstructor);
    }

}


