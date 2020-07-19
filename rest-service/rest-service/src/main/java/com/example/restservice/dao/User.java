package com.example.restservice.dao;

import java.util.Date;

public class User {

    Long u_id;
    String firstname;
    String lastname, email, password;
    Long address_id;

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

    public Long getAddress_id() {
        return address_id;
    }

    public void setAddress_id(Long address_id) {
        this.address_id = address_id;
    }

    public void setU_id(Long u_id) {
        this.u_id = u_id;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Long getU_id() {
        return u_id;
    }

    public String getLastname() {
        return lastname;
    }

    @Override
    public String toString() {
        return "User{" +
                "u_id=" + u_id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", address_id=" + address_id +
                '}';
    }
}
