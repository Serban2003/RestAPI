package com.example.restservice.dao;

import java.util.Date;

public class User {

    Long id;
    String name;
    String firstname, email, password;
    Long billing_address_id, shipping_address_id;

    public User() {

    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getBilling_address_id() {
        return billing_address_id;
    }

    public void setBilling_address_id(Long billing_address_id) {
        this.billing_address_id = billing_address_id;
    }

    public Long getShipping_address_id() {
        return shipping_address_id;
    }

    public void setShipping_address_id(Long shipping_address_id) {
        this.shipping_address_id = shipping_address_id;
    }

    public Date getCreate_ts() {
        return create_ts;
    }

    public void setCreate_ts(Date create_ts) {
        this.create_ts = create_ts;
    }

    Date create_ts;

    public User(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", firstname='" + firstname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", billing_address_id=" + billing_address_id +
                ", shipping_address_id=" + shipping_address_id +
                ", create_ts=" + create_ts +
                '}';
    }
}
