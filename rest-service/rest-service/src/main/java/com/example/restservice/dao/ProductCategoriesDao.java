package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductCategoriesDao extends Dao<Product_Categories>{

    public ProductCategoriesDao(Connection conn) {
        super(conn);
    }

    @Override
    public List<Product_Categories> transform(ResultSet resultSet) throws SQLException {

        List<Product_Categories> productCategories = new ArrayList<>();

        while (resultSet.next()) {
            Product_Categories productCategory = new Product_Categories();
            productCategory.setPc_id(resultSet.getLong(1));
            productCategory.setCategory(resultSet.getString(2));
            productCategories.add(productCategory);
        }
        return productCategories;
    }
}
