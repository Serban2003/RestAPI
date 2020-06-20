package com.example.restservice.dao;

import java.util.Date;

public class Order {
    private Long orderId;
    private Long userId;
    private double total;
    private String status;
    private Date create_ts;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreate_ts() {
        return create_ts;
    }

    public void setCreate_ts(Date create_ts) {
        this.create_ts = create_ts;
    }

    @Override
    public String toString() {
        return "Order{" +
                "o_id=" + orderId +
                ", u_id=" + userId +
                ", total=" + total +
                ", status='" + status + '\'' +
                ", create_ts=" + create_ts +
                '}';
    }
}
