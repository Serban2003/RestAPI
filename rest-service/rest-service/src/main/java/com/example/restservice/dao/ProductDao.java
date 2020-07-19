package com.example.restservice.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDao extends Dao<Product> {

    public ProductDao(Connection conn) {
        super(conn);
    }

    @Override
    public List<Product> transform(ResultSet resultSet) throws SQLException {

        List<Product> products = new ArrayList<>();

        while (resultSet.next()) {
            Product product = new Product();
            product.setP_id(resultSet.getLong(1));
            product.setName(resultSet.getString(2));
            product.setCategory_id(resultSet.getLong(3));
            product.setPrice(resultSet.getDouble(4));
            products.add(product);
        }
        return products;
    }
}

