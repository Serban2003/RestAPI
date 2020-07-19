package com.example.restservice.dao;

public class Order_Item {
    private Long oi_id;
    private Long o_id;
    private Long p_id;
    private Integer quantity;

    public Long getOi_id() {
        return oi_id;
    }

    public void setOi_id(Long oi_id) {
        this.oi_id = oi_id;
    }

    public Long getO_id() {
        return o_id;
    }

    public void setO_id(Long o_id) {
        this.o_id = o_id;
    }

    public Long getP_id() {
        return p_id;
    }

    public void setP_id(Long p_id) {
        this.p_id = p_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Order_Item{" +
                "oi_id=" + oi_id +
                ", o_id=" + o_id +
                ", p_id=" + p_id +
                ", quantity=" + quantity +
                '}';
    }
}
