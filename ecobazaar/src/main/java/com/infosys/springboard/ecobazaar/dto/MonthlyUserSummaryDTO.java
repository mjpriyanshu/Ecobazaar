package com.infosys.springboard.ecobazaar.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.util.List;

public class MonthlyUserSummaryDTO {
    private Long userId;
    private String userName;
    private String month;
    private Integer totalOrders;
    private BigDecimal totalSpent;
    private BigDecimal totalCarbonEmitted;
    private BigDecimal totalCarbonSaved;
    private String ecoRatingAverage;
    private List<TopProductDTO> topProducts;
    private Integer ecoFriendlyCount;
    private Integer moderateCount;
    private Integer highImpactCount;

    public MonthlyUserSummaryDTO() {
    }

    public MonthlyUserSummaryDTO(Long userId, String userName, String month) {
        this.userId = userId;
        this.userName = userName;
        this.month = month;
        this.totalOrders = 0;
        this.totalSpent = BigDecimal.ZERO;
        this.totalCarbonEmitted = BigDecimal.ZERO;
        this.totalCarbonSaved = BigDecimal.ZERO;
        this.ecoRatingAverage = "UNRATED";
        this.ecoFriendlyCount = 0;
        this.moderateCount = 0;
        this.highImpactCount = 0;
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
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(BigDecimal totalSpent) {
        this.totalSpent = totalSpent;
    }

    public BigDecimal getTotalCarbonEmitted() {
        return totalCarbonEmitted;
    }

    public void setTotalCarbonEmitted(BigDecimal totalCarbonEmitted) {
        this.totalCarbonEmitted = totalCarbonEmitted;
    }

    public BigDecimal getTotalCarbonSaved() {
        return totalCarbonSaved;
    }

    public void setTotalCarbonSaved(BigDecimal totalCarbonSaved) {
        this.totalCarbonSaved = totalCarbonSaved;
    }

    public String getEcoRatingAverage() {
        return ecoRatingAverage;
    }

    public void setEcoRatingAverage(String ecoRatingAverage) {
        this.ecoRatingAverage = ecoRatingAverage;
    }

    public List<TopProductDTO> getTopProducts() {
        return topProducts;
    }

    public void setTopProducts(List<TopProductDTO> topProducts) {
        this.topProducts = topProducts;
    }

    public Integer getEcoFriendlyCount() {
        return ecoFriendlyCount;
    }

    public void setEcoFriendlyCount(Integer ecoFriendlyCount) {
        this.ecoFriendlyCount = ecoFriendlyCount;
    }

    public Integer getModerateCount() {
        return moderateCount;
    }

    public void setModerateCount(Integer moderateCount) {
        this.moderateCount = moderateCount;
    }

    public Integer getHighImpactCount() {
        return highImpactCount;
    }

    public void setHighImpactCount(Integer highImpactCount) {
        this.highImpactCount = highImpactCount;
    }
}
