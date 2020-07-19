package com.example.restservice.dao;

public class Product_Categories {
    private Long pc_id;
    private String category;

    public Long getPc_id() {
        return pc_id;
    }

    public void setPc_id(Long pc_id) {
        this.pc_id = pc_id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Product_Categories{" +
                "id=" + pc_id +
                ", category='" + category + '\'' +
                '}';
    }
}
