package com.example.restservice.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductCategoriesDao extends Dao<ProductCategories>{

    public ProductCategoriesDao(Connection conn) {
        super(conn);
    }

    @Override
    public List<ProductCategories> transform(ResultSet resultSet) throws SQLException {

        List<ProductCategories> productCategories = new ArrayList<>();

        while (resultSet.next()) {
            ProductCategories productCategory = new ProductCategories();
            productCategory.setId(resultSet.getLong(1));
            productCategory.setCategory(resultSet.getString(2));
            productCategories.add(productCategory);
        }
        return productCategories;
    }
}
