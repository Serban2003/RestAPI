package com.example.restservice.controller;

import java.lang.reflect.Field;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

// Reflection API
public abstract class UniversalController<T> {

    private Connection connection;
    private Statement statement;

    public UniversalController(Connection conn, Statement state) {
        connection = conn;
        statement = state;
    }

    T obj;
    Class clazz = obj.getClass();
    String className = clazz.getName().toLowerCase();

    final Field[] fields = clazz.getDeclaredFields();
    String field = "";
    String getConstructor = "";

    public void createInsertField() {
        for (int i = 1; i < fields.length; ++i) {
            field += ("`" + fields[i].getName() + "`");

            if (i < fields.length - 1) field += ",";
        }
    }
    public void createFields() {
        for (int i = 1; i < fields.length; ++i) {
            String var = fields[i].getName();

            getConstructor += ("'" + className + ".get" + var.substring(0, 1).toUpperCase() + var.substring(1) + "()" + "'");
            if (i < fields.length - 1) getConstructor += ",";
        }
    }


    public T create(T object) throws SQLException, NoSuchAlgorithmException {
//
//        if (className.equals("User")) {
//            String password = getMD5Encrypted(object);
//        }


        statement.executeUpdate("INSERT INTO " + className + "(" + field + ")" + "VALUES (" + getConstructor + ")");
        return object;
    }

//    private String getMD5Encrypted(@RequestBody T object) throws NoSuchAlgorithmException {
//        MessageDigest md = MessageDigest.getInstance("MD5");
//        md.update(object.getPassword().getBytes());
//        return DatatypeConverter.printHexBinary(md.digest()).toUpperCase();
//    }
}
