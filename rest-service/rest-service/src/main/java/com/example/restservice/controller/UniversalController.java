package com.example.restservice.controller;

import com.example.restservice.dao.User;
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
        statement.execute("INSERT INTO " + getTableName() + " (" + getFieldsName() + ") " + "VALUES (" + getFieldsValues(object) + ")");
        return object;
    }

    public void update(T object) throws SQLException, NoSuchAlgorithmException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        statement.executeUpdate("UPDATE " + getTableName() + "SET " + getUpdateFields(object) + " WHERE " + getIdFieldName() + " = " + getIdFieldsValue(object));
    }

    public void delete(T object) throws SQLException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        statement.executeUpdate("DELETE FROM " + getTableName() + "WHERE " + getIdFieldName() + " = " + getIdFieldsValue(object));
    }

    public String get() throws SQLException {
        JSONArray jsArray = new JSONArray();
        Gson gson = new Gson();

        ResultSet resultSet = statement.executeQuery("SELECT * FROM " + getTypeParameterClass());
        while (resultSet.next()) {
            JSONObject jObj = new JSONObject();
            try {
                for (Field value : getTypeParameterClass().getFields())
                    jObj.put(value.getName(), resultSet.getString(getIdFieldName()));
                jsArray.put(jObj);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return gson.toJson(jsArray);
    }

    private String getUpdateFields(T obj) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        String[] fieldsName = getFieldsName().split(","); //'u_id','firstname'...
        String[] fieldsValue = getIdFieldsValue(obj).split(","); //1,
        StringJoiner sj = new StringJoiner(",");

        for (int i = 0; i < fieldsName.length; ++i) {
            sj.add(fieldsName[i] + "=" + fieldsValue[i]);
        }
        return sj.toString();
    }


    private String getIdFieldsValue(T obj) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String fieldName = getIdFieldName();
        return getTypeParameterClass()
                .getMethod("get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1))
                .invoke(obj)
                .toString();
    }

    private String getIdFieldName() {
        StringBuilder idFieldName = new StringBuilder();
        for (int i = 0; i < getTypeParameterClass().getName().length(); i++) {
            char c = getTypeParameterClass().getName().charAt(i);
            idFieldName.append(Character.isUpperCase(c) ? c + "" : "");
        }
        return idFieldName + "_id";
    }


    @SuppressWarnings("unchecked")
    private Class<T> getTypeParameterClass() {
        Type type = getClass().getGenericSuperclass();
        ParameterizedType paramType = (ParameterizedType) type;
        return (Class<T>) paramType.getActualTypeArguments()[0];
    }

    private String getFieldsValues(T object) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        StringJoiner fieldsValuesBuilder = new StringJoiner(",");
        Field[] fields = getTypeParameterClass().getDeclaredFields();

        for (int i = 1; i < fields.length; ++i) {
            String fieldName = fields[i].getName();
            Class<?> fieldType = fields[i].getType();

            String typeWrapper = fieldType.getName().equals("java.lang.String") ? "'" : "";

            if (!fieldName.equals(getIdFieldName())) {
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
                fieldsValuesBuilder.add(typeWrapper + fieldValue + typeWrapper);
            }
        }
        return fieldsValuesBuilder.toString();
    }

    private String getFieldsName() {
        StringJoiner fieldNamesBuilder = new StringJoiner(",");
        Field[] fields = getTypeParameterClass().getDeclaredFields();

        for (int i = 1; i < fields.length; ++i) {
            String[] fieldsName = fields[i].getName().split("\\.");
            fieldNamesBuilder.add("`" + fieldsName[fieldsName.length - 1] + "`");
        }
        return fieldNamesBuilder.toString();
    }

    private String getMD5Encrypted(String string) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(string.getBytes());
        return DatatypeConverter.printHexBinary(md.digest()).toUpperCase();
    }

    private String getTableName() {
        String[] className = getTypeParameterClass().getName().split("\\.");
        return className[className.length - 1].toLowerCase();
    }

    public boolean userExist(User user) throws SQLException {
        PreparedStatement pstmt1;
        ResultSet rs;

        pstmt1 = connection.prepareStatement("SELECT email FROM `user` where email=?");
        pstmt1.setString(1, user.getEmail());

        rs = pstmt1.executeQuery();

        return !rs.next();
    }

    public int userValid(User user) throws SQLException, NoSuchAlgorithmException {
        if (userExist(user)) return 0; //user doesn't exist
        else {
            PreparedStatement pstmt1;
            ResultSet rs;

            pstmt1 = connection.prepareStatement("SELECT password FROM `user` where email=?");
            pstmt1.setString(1, user.getEmail());

            rs = pstmt1.executeQuery();
            rs.next();
            if (rs.getString(1).equals(getMD5Encrypted(user.getPassword()))) return 1; //connecting
            return 2; //wrong password
        }

    }
}
