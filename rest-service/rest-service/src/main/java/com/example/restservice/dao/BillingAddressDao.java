package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BillingAddressDao extends Dao<BillingAddress>{
    public BillingAddressDao(Connection conn) {
        super(conn);
    }

    @Override
    protected List<BillingAddress> transform(ResultSet resultSet) throws SQLException {

        List<BillingAddress> billingAddresses = new ArrayList<>();

        while (resultSet.next()) {
            BillingAddress billingAddress = new BillingAddress();
            billingAddress.setAddressId(resultSet.getLong(1));
            billingAddress.setUserId(resultSet.getLong(2));
            billingAddress.setAddress(resultSet.getString(3));
            billingAddresses.add(billingAddress);
        }
        return billingAddresses;
    }
}
