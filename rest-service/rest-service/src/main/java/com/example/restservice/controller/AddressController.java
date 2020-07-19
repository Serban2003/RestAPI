package com.example.restservice.controller;

import com.example.restservice.dao.Address;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.InvocationTargetException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

@Controller
public class AddressController extends UniversalController<Address> {
    @ResponseBody
    @PostMapping("/address/")
    @Override
    public Address create(@RequestBody Address address) throws SQLException, NoSuchAlgorithmException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        return super.create(address);
    }

    @ResponseBody
    @PostMapping("/address/update/")
    public void update(@RequestBody Address address) throws SQLException, NoSuchAlgorithmException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        super.update(address);
    }

    @ResponseBody
    @PostMapping("/address/delete/")
    public void delete(@RequestBody Address address) throws SQLException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        super.delete(address);
    }

    @ResponseBody
    @RequestMapping(value = "address/alladdresses/")
    protected String doGet() throws SQLException {
        return super.get();
    }
}
