package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ShippingAddressDao extends Dao<ShippingAddress>{
    public ShippingAddressDao(Connection conn) {
        super(conn);
    }

    @Override
    protected List<ShippingAddress> transform(ResultSet resultSet) throws SQLException {

        List<ShippingAddress> shippingAddresses = new ArrayList<>();

        while (resultSet.next()) {
            ShippingAddress shippingAddress = new ShippingAddress();
            shippingAddress.setAddressId(resultSet.getLong(1));
            shippingAddress.setUserId(resultSet.getLong(2));
            shippingAddress.setAddress(resultSet.getString(3));
            shippingAddresses.add(shippingAddress);
        }
        return shippingAddresses;
    }
}
