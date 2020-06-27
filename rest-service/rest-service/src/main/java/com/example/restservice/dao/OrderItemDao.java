package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderItemDao extends Dao<OrderItem>{

    public OrderItemDao(Connection conn) {
        super(conn);
    }

    @Override
    protected List<OrderItem> transform(ResultSet resultSet) throws SQLException {

        List<OrderItem> orderItems = new ArrayList<>();

        while (resultSet.next()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderItemId(resultSet.getLong(1));
            orderItem.setOrderId(resultSet.getLong(2));
            orderItem.setProductId(resultSet.getLong(3));
            orderItem.setQuantity(resultSet.getInt(4));
            orderItems.add(orderItem);
        }
        return orderItems;
    }
}
