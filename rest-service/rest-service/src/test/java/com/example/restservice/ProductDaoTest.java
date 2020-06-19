package com.example.restservice;

import com.example.restservice.dao.Product;
import com.example.restservice.dao.ProductDao;
import com.example.restservice.dao.User;
import com.example.restservice.dao.UserDao;
import org.junit.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class ProductDaoTest {

    @Test
    public void generateOrderTest() {
        try {

            Class.forName("com.mysql.cj.jdbc.Driver");
            // Setup the connection with the DB
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost/store", "root", "");

            ProductDao productDao = new ProductDao(connection);
            UserDao userDao = new UserDao(connection);
//               1. Extragem produsele

            List<Product> resultSetProduct = productDao.executeQuery("Select * from products");
            for (Product p : resultSetProduct) {
                System.out.println(p);

            }
//               2. Extragem userii

            List<User> resultSetUser = userDao.executeQuery("Select * from user");
            for (User u: resultSetUser) {
                System.out.println(u);

            }
//               3. Random products, quantities, user
//               4. Insert order
//               5. Insert order items

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void logResultSet(ResultSet resultSet) throws SQLException {

        int cols = resultSet.getMetaData().getColumnCount();

        while (resultSet.next()) {
            for (int i = 1; i <= cols; ++i) {
                System.out.print(resultSet.getString(i) + " | ");
            }
            System.out.print('\n');
        }
    }
}

