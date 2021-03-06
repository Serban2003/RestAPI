package com.example.restservice.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDao extends Dao<User> {

    public UserDao(Connection connection){
        super(connection);
    }

    @Override
    protected List<User> transform(ResultSet resultSet) throws SQLException {

        List<User> users = new ArrayList<>();

        while (resultSet.next()) {
            User user = new User();
            user.setU_id(resultSet.getLong(1));
            user.setLastname(resultSet.getString(2));
            user.setFirstname(resultSet.getString(3));
            user.setEmail(resultSet.getString(4));
            user.setPassword(resultSet.getString(5));
            user.setAddress(resultSet.getString(6));
            users.add(user);
        }
        return users;
    }
}
