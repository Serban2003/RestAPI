package com.example.restservice.controller;

import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.xml.bind.DatatypeConverter;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.ResultSet;
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
    String getSetter = "";
    String password;

    public void createSetterAndGetter() throws NoSuchMethodException, NoSuchAlgorithmException, IllegalAccessException, InvocationTargetException {
        createFields(field, getConstructor);
        createFields(getSetter, field);
    }

    public void createFields(String field, String string) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, NoSuchAlgorithmException {
        for (int i = 1; i < fields.length; ++i) {
            field += ("`" + fields[i].getName() + "`");

            String var = fields[i].getName();
            String name = "get" + var.substring(0, 1).toUpperCase() + var.substring(1);

            Method sumInstanceMethod = clazz.getMethod(name);
            String result = sumInstanceMethod.invoke(obj).toString();

            if(var.equals("password")){
                password = getMD5Encrypted(result);
                result = password;
            }

            string += ("'" + result + "'");
            if (i < fields.length - 1) {
                field += ",";
                string += ",";
            }
        }
    }

    public String getID() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String var = fields[0].getName();
        String name = "get" + var.substring(0, 1).toUpperCase() + var.substring(1);
        Method sumInstanceMethod = clazz.getMethod(name);

        return sumInstanceMethod.invoke(obj).toString();
    }

    private String getMD5Encrypted(String string) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(string.getBytes());
        return DatatypeConverter.printHexBinary(md.digest()).toUpperCase();
    }

    public T create(T object) throws SQLException, NoSuchAlgorithmException {
        statement.executeUpdate("INSERT INTO " + className + "(" + field + ")" + "VALUES (" + getConstructor + ")");
        return object;
    }
    public void update(T object) throws SQLException, NoSuchAlgorithmException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        statement.executeUpdate("UPDATE " + className + "SET " + getSetter + " WHERE " + fields[0].getName() + " = " + getID());
    }
    public void delete(T object) throws SQLException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        statement.executeUpdate("DELETE FROM " + className + "WHERE " + fields[0].getName() + " = " + getID());
    }

    protected String doGet() throws SQLException {
        JSONArray jsArray = new JSONArray();
        Gson gson = new Gson();

        ResultSet resultSet = statement.executeQuery("SELECT * FROM " + className);
        while(resultSet.next()){
            JSONObject jObj = new JSONObject();
            try {
                for (Field value : fields) jObj.put(value.getName(), resultSet.getString("u_id"));
                jsArray.put(jObj);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return gson.toJson(jsArray);
    }

}
