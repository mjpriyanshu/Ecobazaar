package com.infosys.springboard.ecobazaar.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Report DTO for SELLER showing items SOLD
 */
public class SellerSalesReportDTO {
    private Long sellerId;
    private String sellerName;
    private String month;
    private Integer totalItemsSold;
    private Integer totalOrders;
    private BigDecimal totalRevenue;
    private BigDecimal totalCarbonImpact;
    private List<SoldItemDTO> itemsSold;

    public SellerSalesReportDTO() {
        this.itemsSold = new ArrayList<>();
        this.totalItemsSold = 0;
        this.totalOrders = 0;
        this.totalRevenue = BigDecimal.ZERO;
        this.totalCarbonImpact = BigDecimal.ZERO;
    }

    public SellerSalesReportDTO(Long sellerId, String sellerName, String month) {
        this();
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.month = month;
    }

    // Nested class for sold item details
    public static class SoldItemDTO {
        private String productName;
        private Integer quantitySold;
        private BigDecimal pricePerUnit;
        private BigDecimal totalRevenue;
        private BigDecimal carbonImpactPerUnit;
        private BigDecimal totalCarbonImpact;
        private String orderDate;

        public SoldItemDTO() {}

        public SoldItemDTO(String productName, Integer quantitySold, BigDecimal pricePerUnit,
                          BigDecimal totalRevenue, BigDecimal carbonImpactPerUnit,
                          BigDecimal totalCarbonImpact, String orderDate) {
            this.productName = productName;
            this.quantitySold = quantitySold;
            this.pricePerUnit = pricePerUnit;
            this.totalRevenue = totalRevenue;
            this.carbonImpactPerUnit = carbonImpactPerUnit;
            this.totalCarbonImpact = totalCarbonImpact;
            this.orderDate = orderDate;
        }

        // Getters and Setters
        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public Integer getQuantitySold() {
            return quantitySold;
        }

        public void setQuantitySold(Integer quantitySold) {
            this.quantitySold = quantitySold;
        }

        public BigDecimal getPricePerUnit() {
            return pricePerUnit;
        }

        public void setPricePerUnit(BigDecimal pricePerUnit) {
            this.pricePerUnit = pricePerUnit;
        }

        public BigDecimal getTotalRevenue() {
            return totalRevenue;
        }

        public void setTotalRevenue(BigDecimal totalRevenue) {
            this.totalRevenue = totalRevenue;
        }

        public BigDecimal getCarbonImpactPerUnit() {
            return carbonImpactPerUnit;
        }

        public void setCarbonImpactPerUnit(BigDecimal carbonImpactPerUnit) {
            this.carbonImpactPerUnit = carbonImpactPerUnit;
        }

        public BigDecimal getTotalCarbonImpact() {
            return totalCarbonImpact;
        }

        public void setTotalCarbonImpact(BigDecimal totalCarbonImpact) {
            this.totalCarbonImpact = totalCarbonImpact;
        }

        public String getOrderDate() {
            return orderDate;
        }

        public void setOrderDate(String orderDate) {
            this.orderDate = orderDate;
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

    public Integer getTotalItemsSold() {
        return totalItemsSold;
    }

    public void setTotalItemsSold(Integer totalItemsSold) {
        this.totalItemsSold = totalItemsSold;
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

    public List<SoldItemDTO> getItemsSold() {
        return itemsSold;
    }

    public void setItemsSold(List<SoldItemDTO> itemsSold) {
        this.itemsSold = itemsSold;
    }
}
