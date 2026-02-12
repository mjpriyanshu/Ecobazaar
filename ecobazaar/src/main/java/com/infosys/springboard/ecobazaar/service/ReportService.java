package com.infosys.springboard.ecobazaar.service;

import com.infosys.springboard.ecobazaar.dto.SellerSalesReportDTO;
import com.infosys.springboard.ecobazaar.dto.UserPurchaseReportDTO;
import com.infosys.springboard.ecobazaar.entity.Order;
import com.infosys.springboard.ecobazaar.entity.OrderItem;
import com.infosys.springboard.ecobazaar.entity.User;
import com.infosys.springboard.ecobazaar.repository.OrderRepository;
import com.infosys.springboard.ecobazaar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ReportService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Generate USER PURCHASE REPORT - shows items BOUGHT by user
     */
    public UserPurchaseReportDTO generateUserPurchaseReport(Long userId, String month) {
        // Parse month
        YearMonth yearMonth = YearMonth.parse(month, DateTimeFormatter.ofPattern("yyyy-MM"));
        LocalDateTime startDate = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endDate = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        // Get user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Get user's orders in date range
        List<Order> orders = orderRepository.findByUserIdAndOrderDateBetween(userId, startDate, endDate);

        // Create report
        UserPurchaseReportDTO report = new UserPurchaseReportDTO(userId, user.getName(), month);

        Set<Long> uniqueOrderIds = new HashSet<>();
        int totalItems = 0;
        BigDecimal totalSpent = BigDecimal.ZERO;
        BigDecimal totalCarbon = BigDecimal.ZERO;

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        for (Order order : orders) {
            uniqueOrderIds.add(order.getId());

            for (OrderItem item : order.getOrderItems()) {
                // Create purchased item DTO
                UserPurchaseReportDTO.PurchasedItemDTO purchasedItem =
                        new UserPurchaseReportDTO.PurchasedItemDTO(
                                item.getProduct().getName(),
                                item.getQuantity(),
                                item.getPrice(),
                                item.getSubtotal(),
                                item.getCarbonImpact(),
                                item.getTotalCarbon(),
                                order.getOrderDate().format(dateFormatter),
                                item.getProduct().getSeller().getName()
                        );

                report.getItemsBought().add(purchasedItem);

                // Update totals
                totalItems += item.getQuantity();
                totalSpent = totalSpent.add(item.getSubtotal());
                totalCarbon = totalCarbon.add(item.getTotalCarbon());
            }
        }

        report.setTotalOrders(uniqueOrderIds.size());
        report.setTotalItemsBought(totalItems);
        report.setTotalSpent(totalSpent);
        report.setTotalCarbonEmitted(totalCarbon);

        System.out.println("✅ USER PURCHASE REPORT GENERATED");
        System.out.println("   User: " + user.getName());
        System.out.println("   Month: " + month);
        System.out.println("   Total Orders: " + report.getTotalOrders());
        System.out.println("   Total Items Bought: " + report.getTotalItemsBought());
        System.out.println("   Total Spent: ₹" + report.getTotalSpent());

        return report;
    }

    /**
     * Generate SELLER SALES REPORT - shows items SOLD by seller
     */
    public SellerSalesReportDTO generateSellerSalesReport(Long sellerId, String month) {
        // Parse month
        YearMonth yearMonth = YearMonth.parse(month, DateTimeFormatter.ofPattern("yyyy-MM"));
        LocalDateTime startDate = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endDate = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        // Get seller
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found with ID: " + sellerId));

        // Get orders containing seller's products
        List<Order> orders = orderRepository.findOrdersBySellerAndDateRange(sellerId, startDate, endDate);

        // Create report
        SellerSalesReportDTO report = new SellerSalesReportDTO(sellerId, seller.getName(), month);

        Set<Long> uniqueOrderIds = new HashSet<>();
        int totalItems = 0;
        BigDecimal totalRevenue = BigDecimal.ZERO;
        BigDecimal totalCarbon = BigDecimal.ZERO;

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        System.out.println("\n=== SELLER SALES REPORT GENERATION ===");
        System.out.println("Seller: " + seller.getName() + " (ID: " + sellerId + ")");
        System.out.println("Month: " + month);
        System.out.println("Orders found: " + orders.size());

        for (Order order : orders) {
            System.out.println("\n  Processing Order #" + order.getId());
            System.out.println("  Order Date: " + order.getOrderDate());
            System.out.println("  Order Items: " + order.getOrderItems().size());

            for (OrderItem item : order.getOrderItems()) {
                // Only include items that belong to THIS seller
                if (item.getProduct().getSeller().getId().equals(sellerId)) {
                    System.out.println("    ✓ Item belongs to seller: " + item.getProduct().getName() + 
                                     " (Qty: " + item.getQuantity() + ")");

                    // Create sold item DTO
                    SellerSalesReportDTO.SoldItemDTO soldItem =
                            new SellerSalesReportDTO.SoldItemDTO(
                                    item.getProduct().getName(),
                                    item.getQuantity(),
                                    item.getPrice(),
                                    item.getSubtotal(),
                                    item.getCarbonImpact(),
                                    item.getTotalCarbon(),
                                    order.getOrderDate().format(dateFormatter)
                            );

                    report.getItemsSold().add(soldItem);

                    // Update totals
                    totalItems += item.getQuantity();
                    totalRevenue = totalRevenue.add(item.getSubtotal());
                    totalCarbon = totalCarbon.add(item.getTotalCarbon());
                    uniqueOrderIds.add(order.getId());
                } else {
                    System.out.println("    ✗ Item belongs to different seller: " + 
                                     item.getProduct().getName() + " (Seller ID: " + 
                                     item.getProduct().getSeller().getId() + ")");
                }
            }
        }

        report.setTotalOrders(uniqueOrderIds.size());
        report.setTotalItemsSold(totalItems);
        report.setTotalRevenue(totalRevenue);
        report.setTotalCarbonImpact(totalCarbon);

        System.out.println("\n✅ SELLER SALES REPORT COMPLETED");
        System.out.println("   Total Orders: " + report.getTotalOrders());
        System.out.println("   Total Items Sold: " + report.getTotalItemsSold());
        System.out.println("   Total Revenue: ₹" + report.getTotalRevenue());
        System.out.println("   Items in Report: " + report.getItemsSold().size());
        System.out.println("=====================================\n");

        return report;
    }
}
