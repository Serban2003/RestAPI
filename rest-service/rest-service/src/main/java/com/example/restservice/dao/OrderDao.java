package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderDao extends Dao<Order> {
    public OrderDao(Connection conn) {
        super(conn);
    }

    @Override
    protected List<Order> transform(ResultSet resultSet) throws SQLException {

        List<Order> orders = new ArrayList<>();

        while (resultSet.next()) {
            Order order = new Order();
            order.setOrderId(resultSet.getLong(1));
            order.setUserId(resultSet.getLong(2));
            order.setTotal(resultSet.getDouble(3));
            order.setStatus(resultSet.getString(4));
            order.setCreate_ts(resultSet.getDate(5));
            orders.add(order);
        }
        return orders;
    }
}
