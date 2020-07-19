package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AddressDao extends Dao<Address>{
    public AddressDao(Connection conn) {
        super(conn);
    }

    @Override
    protected List<Address> transform(ResultSet resultSet) throws SQLException {

        List<Address> addresses = new ArrayList<>();

        while (resultSet.next()) {
            Address address = new Address();
            address.setA_id(resultSet.getLong(1));
            address.setAddress(resultSet.getString(3));
            addresses.add(address);
        }
        return addresses;
    }
}
