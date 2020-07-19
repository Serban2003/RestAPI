package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderItemDao extends Dao<Order_Item>{

    public OrderItemDao(Connection conn) {
        super(conn);
    }

    @Override
    protected List<Order_Item> transform(ResultSet resultSet) throws SQLException {

        List<Order_Item> orderItems = new ArrayList<>();

        while (resultSet.next()) {
            Order_Item orderItem = new Order_Item();
            orderItem.setOi_id(resultSet.getLong(1));
            orderItem.setO_id(resultSet.getLong(2));
            orderItem.setP_id(resultSet.getLong(3));
            orderItem.setQuantity(resultSet.getInt(4));
            orderItems.add(orderItem);
        }
        return orderItems;
    }
}
