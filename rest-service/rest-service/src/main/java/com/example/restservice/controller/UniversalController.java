package com.example.restservice.controller;

import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.xml.bind.DatatypeConverter;
import java.lang.reflect.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.util.StringJoiner;

/**
 * Magic controller that connects to MySQL database and provides default INSERT, UPDATE, DELETE querys based on <T>
 *
 * @param <T>
 */
public abstract class UniversalController<T> {

    private Connection connection;
    private Statement statement;

    {
        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost/store", "root", "");
            statement = connection.createStatement();
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
    }

    public T create(T object) throws SQLException, NoSuchAlgorithmException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        statement.execute("INSERT INTO " + getTableName() + "(" + getFieldsNames(object) + ")" + "VALUES (" + getFieldsValues(object) + ")");
        return object;
    }


    public void update(T object) throws SQLException, NoSuchAlgorithmException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        statement.executeUpdate("UPDATE " + getTableName() + "SET " + getUpdateFields() + " WHERE " + getIdFieldName() + " = " + getIdFieldValue(object));
    }

    public void delete(T object) throws SQLException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        statement.executeUpdate("DELETE FROM " + getTableName() + "WHERE " + getIdFieldName() + " = " + getIdFieldValue(object));
    }

    public String get() throws SQLException {
        JSONArray jsArray = new JSONArray();
        Gson gson = new Gson();

        ResultSet resultSet = statement.executeQuery("SELECT * FROM " + getTypeParameterClass());
        while (resultSet.next()) {
            JSONObject jObj = new JSONObject();
            try {
                for (Field value : getTypeParameterClass().getFields()) jObj.put(value.getName(), resultSet.getString("u_id"));
                jsArray.put(jObj);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return gson.toJson(jsArray);
    }


    private String getUpdateFields() {
        return null;
    }


    private String getIdFieldValue(T obj) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String fieldName = getIdFieldName();
        return getTypeParameterClass()
                .getMethod("get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1))
                .invoke(obj)
                .toString();
    }

    private String getIdFieldName() {
        String idFieldName = "";
        for (int i=0;i< getTypeParameterClass().getName().length(); i ++ ){
            char c =  getTypeParameterClass().getName().charAt(i);
            idFieldName += Character.isUpperCase(c) ? c+"" : "";
        }
        return idFieldName + "_id";
    }


    @SuppressWarnings ("unchecked")
    private Class<T> getTypeParameterClass()
    {
        Type type = getClass().getGenericSuperclass();
        ParameterizedType paramType = (ParameterizedType) type;
        return (Class<T>) paramType.getActualTypeArguments()[0];
    }

    private String getFieldsValues(T object) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        StringJoiner fieldsValuesBuilder = new StringJoiner(",");
        Field[] fields = getTypeParameterClass().getFields();

        for (int i = 1; i < fields.length; ++i) {
            String fieldName = fields[i].getName();

            String fieldValue = getTypeParameterClass()
                    .getMethod("get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1))
                    .invoke(object)
                    .toString();

            if (fieldName.equals("password")) {
                try {
                    fieldValue = getMD5Encrypted(fieldValue);
                } catch (NoSuchAlgorithmException e) {
                    e.printStackTrace();
                }
            }

            fieldsValuesBuilder.add("'" + fieldValue + "'");
        }

        return fieldsValuesBuilder.toString();
    }

    private String getFieldsNames(T object) {
        StringJoiner fieldNamesBuilder = new StringJoiner(",");
        Field[] fields = getTypeParameterClass().getFields();

        for (int i = 1; i < fields.length; ++i) {
            fieldNamesBuilder.add("`" + fields[i].getName() + "`");
        }
        return fieldNamesBuilder.toString();
    }

    private String getMD5Encrypted(String string) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(string.getBytes());
        return DatatypeConverter.printHexBinary(md.digest()).toUpperCase();
    }

    private String getTableName(){
        return getTypeParameterClass().toString().toLowerCase();
    }

}
