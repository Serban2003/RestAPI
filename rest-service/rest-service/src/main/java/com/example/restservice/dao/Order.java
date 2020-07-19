package com.example.restservice.dao;

import java.util.Date;

public class Order {
    private Long o_id;
    private Long u_id;
    private double total;
    private String status;
    private Date create_ts;

    public Long getO_id() {
        return o_id;
    }

    public void setO_id(Long o_id) {
        this.o_id = o_id;
    }

    public Long getU_id() {
        return u_id;
    }

    public void setU_id(Long u_id) {
        this.u_id = u_id;
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
                "o_id=" + o_id +
                ", u_id=" + u_id +
                ", total=" + total +
                ", status='" + status + '\'' +
                ", create_ts=" + create_ts +
                '}';
    }
}
