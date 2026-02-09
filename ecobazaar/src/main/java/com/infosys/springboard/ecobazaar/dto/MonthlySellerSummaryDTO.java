package com.infosys.springboard.ecobazaar.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.util.List;

public class MonthlySellerSummaryDTO {
    private Long sellerId;
    private String sellerName;
    private String month;
    private Integer totalProductsSold;
    private Integer totalOrders;
    private BigDecimal totalRevenue;
    private BigDecimal totalCarbonImpact;
    private Double ecoCertifiedPercentage;
    private List<String> topEcoProducts;
    private Integer ecoFriendlyProductsSold;
    private Integer moderateProductsSold;
    private Integer highImpactProductsSold;

    public MonthlySellerSummaryDTO() {
    }

    public MonthlySellerSummaryDTO(Long sellerId, String sellerName, String month) {
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.month = month;
        this.totalProductsSold = 0;
        this.totalOrders = 0;
        this.totalRevenue = BigDecimal.ZERO;
        this.totalCarbonImpact = BigDecimal.ZERO;
        this.ecoCertifiedPercentage = 0.0;
        this.ecoFriendlyProductsSold = 0;
        this.moderateProductsSold = 0;
        this.highImpactProductsSold = 0;
    }

    /**
     * Convert to JSON string for AI prompt
     */
    public String toJson() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "{}";
        }
    }

    // Getters and Setters
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Integer getTotalProductsSold() {
        return totalProductsSold;
    }

    public void setTotalProductsSold(Integer totalProductsSold) {
        this.totalProductsSold = totalProductsSold;
    }

    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public BigDecimal getTotalCarbonImpact() {
        return totalCarbonImpact;
    }

    public void setTotalCarbonImpact(BigDecimal totalCarbonImpact) {
        this.totalCarbonImpact = totalCarbonImpact;
    }

    public Double getEcoCertifiedPercentage() {
        return ecoCertifiedPercentage;
    }

    public void setEcoCertifiedPercentage(Double ecoCertifiedPercentage) {
        this.ecoCertifiedPercentage = ecoCertifiedPercentage;
    }

    public List<String> getTopEcoProducts() {
        return topEcoProducts;
    }

    public void setTopEcoProducts(List<String> topEcoProducts) {
        this.topEcoProducts = topEcoProducts;
    }

    public Integer getEcoFriendlyProductsSold() {
        return ecoFriendlyProductsSold;
    }

    public void setEcoFriendlyProductsSold(Integer ecoFriendlyProductsSold) {
        this.ecoFriendlyProductsSold = ecoFriendlyProductsSold;
    }

    public Integer getModerateProductsSold() {
        return moderateProductsSold;
    }

    public void setModerateProductsSold(Integer moderateProductsSold) {
        this.moderateProductsSold = moderateProductsSold;
    }

    public Integer getHighImpactProductsSold() {
        return highImpactProductsSold;
    }

    public void setHighImpactProductsSold(Integer highImpactProductsSold) {
        this.highImpactProductsSold = highImpactProductsSold;
    }
}
