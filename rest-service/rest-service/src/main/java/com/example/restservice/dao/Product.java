package com.example.restservice.dao;

public class Product {

    private Long p_id;
    private String name;
    private Long category_id;
    private Double price;

    public Long getP_id() {
        return p_id;
    }

    public void setP_id(Long p_id) {
        this.p_id = p_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Long category_id) {
        this.category_id = category_id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "p_id=" + p_id +
                ", name='" + name + '\'' +
                ", category_id=" + category_id +
                ", price=" + price +
                '}';
    }
}
