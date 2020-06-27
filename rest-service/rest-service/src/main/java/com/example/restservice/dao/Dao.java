package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

abstract class Dao <T> {

    private Connection connection;

    public Dao(Connection conn){
        connection = conn;
    }
    public List<T> executeQuery(String query) throws Exception {
        return transform(connection.createStatement().executeQuery(query));
    }

    protected abstract List<T> transform(ResultSet executeQuery) throws SQLException;
}
