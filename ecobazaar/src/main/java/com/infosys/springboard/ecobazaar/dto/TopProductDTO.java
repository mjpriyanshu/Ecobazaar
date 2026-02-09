package com.infosys.springboard.ecobazaar.dto;

import java.math.BigDecimal;

public class TopProductDTO {
    private String name;
    private BigDecimal carbon;
    private Integer quantity;
    private String category;

    public TopProductDTO() {
    }

    public TopProductDTO(String name, BigDecimal carbon, Integer quantity, String category) {
        this.name = name;
        this.carbon = carbon;
        this.quantity = quantity;
        this.category = category;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getCarbon() {
        return carbon;
    }

    public void setCarbon(BigDecimal carbon) {
        this.carbon = carbon;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
