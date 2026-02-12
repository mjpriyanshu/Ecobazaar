package com.infosys.springboard.ecobazaar.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Report DTO for USER showing items BOUGHT
 */
public class UserPurchaseReportDTO {
    private Long userId;
    private String userName;
    private String month;
    private Integer totalItemsBought;
    private Integer totalOrders;
    private BigDecimal totalSpent;
    private BigDecimal totalCarbonEmitted;
    private List<PurchasedItemDTO> itemsBought;

    public UserPurchaseReportDTO() {
        this.itemsBought = new ArrayList<>();
        this.totalItemsBought = 0;
        this.totalOrders = 0;
        this.totalSpent = BigDecimal.ZERO;
        this.totalCarbonEmitted = BigDecimal.ZERO;
    }

    public UserPurchaseReportDTO(Long userId, String userName, String month) {
        this();
        this.userId = userId;
        this.userName = userName;
        this.month = month;
    }

    // Nested class for purchased item details
    public static class PurchasedItemDTO {
        private String productName;
        private Integer quantityBought;
        private BigDecimal pricePerUnit;
        private BigDecimal totalCost;
        private BigDecimal carbonImpactPerUnit;
        private BigDecimal totalCarbonEmitted;
        private String orderDate;
        private String sellerName;

        public PurchasedItemDTO() {}

        public PurchasedItemDTO(String productName, Integer quantityBought, BigDecimal pricePerUnit,
                               BigDecimal totalCost, BigDecimal carbonImpactPerUnit,
                               BigDecimal totalCarbonEmitted, String orderDate, String sellerName) {
            this.productName = productName;
            this.quantityBought = quantityBought;
            this.pricePerUnit = pricePerUnit;
            this.totalCost = totalCost;
            this.carbonImpactPerUnit = carbonImpactPerUnit;
            this.totalCarbonEmitted = totalCarbonEmitted;
            this.orderDate = orderDate;
            this.sellerName = sellerName;
        }

        // Getters and Setters
        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public Integer getQuantityBought() {
            return quantityBought;
        }

        public void setQuantityBought(Integer quantityBought) {
            this.quantityBought = quantityBought;
        }

        public BigDecimal getPricePerUnit() {
            return pricePerUnit;
        }

        public void setPricePerUnit(BigDecimal pricePerUnit) {
            this.pricePerUnit = pricePerUnit;
        }

        public BigDecimal getTotalCost() {
            return totalCost;
        }

        public void setTotalCost(BigDecimal totalCost) {
            this.totalCost = totalCost;
        }

        public BigDecimal getCarbonImpactPerUnit() {
            return carbonImpactPerUnit;
        }

        public void setCarbonImpactPerUnit(BigDecimal carbonImpactPerUnit) {
            this.carbonImpactPerUnit = carbonImpactPerUnit;
        }

        public BigDecimal getTotalCarbonEmitted() {
            return totalCarbonEmitted;
        }

        public void setTotalCarbonEmitted(BigDecimal totalCarbonEmitted) {
            this.totalCarbonEmitted = totalCarbonEmitted;
        }

        public String getOrderDate() {
            return orderDate;
        }

        public void setOrderDate(String orderDate) {
            this.orderDate = orderDate;
        }

        public String getSellerName() {
            return sellerName;
        }

        public void setSellerName(String sellerName) {
            this.sellerName = sellerName;
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

    public Integer getTotalItemsBought() {
        return totalItemsBought;
    }

    public void setTotalItemsBought(Integer totalItemsBought) {
        this.totalItemsBought = totalItemsBought;
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

    public List<PurchasedItemDTO> getItemsBought() {
        return itemsBought;
    }

    public void setItemsBought(List<PurchasedItemDTO> itemsBought) {
        this.itemsBought = itemsBought;
    }
}
