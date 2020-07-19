package com.example.restservice.dao;

public class Address {
    private Long a_id;
    private String address;

    public Long getA_id() {
        return a_id;
    }

    public void setA_id(Long a_id) {
        this.a_id = a_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Address{" +
                "a_id=" + a_id +
                ", address='" + address + '\'' +
                '}';
    }
}
