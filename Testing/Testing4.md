MILESTONE 4 - REPORTS & ANALYTICS SYSTEM


Step 1: Postman Testing - API Endpoints

You'll need JWT token for authenticated requests.

User credentials:
- Email: user@gmail.com
- Password: 123456

Seller credentials:
- Email: seller@gmail.com  
- Password: 123456

Admin credentials:
- Email: admin@gmail.com
- Password: admin123

/*============================================*/
/* PART 1: USER PURCHASE REPORTS             */
/*============================================*/

1.1 Get User Purchase Report (Current Month)

GET http://localhost:8080/api/reports/user/{userId}/purchases
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: 
{
  "userId": 1,
  "userName": "User Name",
  "month": "2026-03",
  "totalOrders": 5,
  "totalItemsBought": 12,
  "totalSpent": 15000.00,
  "totalCarbonFootprint": 45.50,
  "categoryBreakdown": [
    {
      "category": "ELECTRONICS",
      "itemCount": 5,
      "totalSpent": 8000.00,
      "totalCarbon": 25.00
    },
    {
      "category": "CLOTHING",
      "itemCount": 7,
      "totalSpent": 7000.00,
      "totalCarbon": 20.50
    }
  ],
  "itemsBought": [
    {
      "productName": "Solar Power Bank",
      "quantity": 2,
      "pricePerUnit": 2999.00,
      "totalCost": 5998.00,
      "carbonImpact": 3.50,
      "totalCarbon": 7.00,
      "orderDate": "2026-03-01 14:30",
      "category": "ELECTRONICS",
      "ecoRating": "MODERATE",
      "sellerName": "Seller1"
    }
  ],
  "carbonImpactDetails": {
    "totalCarbon": 45.50,
    "estimatedTreesNeeded": 2.0,
    "averageCarbonPerItem": 3.79,
    "ecoFriendlySavings": 15.00
  }
}

/*------------------------------------*/

1.2 Get User Purchase Report (Specific Month)

GET http://localhost:8080/api/reports/user/{userId}/purchases?month=2026-02
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: Similar to 1.1 but for February 2026

/*------------------------------------*/

1.3 Generate AI Summary for User Report

POST http://localhost:8080/api/reports/user/{userId}/ai-summary?month=2026-03
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data:
{
  "success": true,
  "summary": "## 📊 Your March 2026 Shopping Report\n\n### 🛍️ Purchase Summary\n...",
  "reportDate": "2026-03-04T10:30:00"
}

Note: AI summary is generated using Google Gemini API with markdown formatting
Note: Summary includes:
- Purchase statistics
- Carbon footprint analysis
- Eco-friendly recommendations
- Category-wise breakdown
- Personalized sustainability tips

/*------------------------------------*/

1.4 Get Report Health Check

GET http://localhost:8080/api/reports/health

Expected Response: 200 OK
Expected Data:
{
  "status": "Reports service is running",
  "timestamp": "2026-03-04T10:30:00"
}


/*============================================*/
/* PART 2: SELLER SALES REPORTS              */
/*============================================*/

2.1 Get Seller Sales Report (Current Month)

GET http://localhost:8080/api/reports/seller/{sellerId}/sales
Headers:
  Authorization: Bearer <seller_jwt_token>

Expected Response: 200 OK
Expected Data:
{
  "sellerId": 2,
  "sellerName": "Seller1",
  "month": "2026-03",
  "totalOrders": 8,
  "totalItemsSold": 20,
  "totalRevenue": 35000.00,
  "totalCarbonImpact": 65.50,
  "categoryBreakdown": [
    {
      "category": "ELECTRONICS",
      "itemCount": 10,
      "totalRevenue": 20000.00,
      "totalCarbon": 35.00,
      "orderCount": 5
    },
    {
      "category": "BEAUTY",
      "itemCount": 10,
      "totalRevenue": 15000.00,
      "totalCarbon": 30.50,
      "orderCount": 6
    }
  ],
  "revenueByCategory": {
    "ELECTRONICS": 20000.00,
    "BEAUTY": 15000.00
  },
  "itemsSold": [
    {
      "productName": "Solar Power Bank",
      "quantity": 5,
      "pricePerUnit": 2999.00,
      "totalRevenue": 14995.00,
      "carbonImpact": 3.50,
      "totalCarbon": 17.50,
      "orderDate": "2026-03-01 14:30",
      "category": "ELECTRONICS",
      "ecoRating": "MODERATE",
      "buyerName": "User Name"
    }
  ],
  "dailySales": {
    "2026-03-01": {
      "date": "2026-03-01",
      "itemsSold": 5,
      "revenue": 14995.00,
      "orderCount": 2
    },
    "2026-03-02": {
      "date": "2026-03-02",
      "itemsSold": 8,
      "revenue": 12000.00,
      "orderCount": 3
    }
  },
  "carbonImpactDetails": {
    "totalCarbon": 65.50,
    "estimatedSaved": 20.00,
    "averageCarbonPerItem": 3.28,
    "ecoFriendlyCount": 5,
    "moderateCount": 10,
    "highImpactCount": 5
  }
}

Note: This endpoint is restricted to SELLER role only

/*------------------------------------*/

2.2 Get Seller Sales Report (Specific Month)

GET http://localhost:8080/api/reports/seller/{sellerId}/sales?month=2026-02
Headers:
  Authorization: Bearer <seller_jwt_token>

Expected Response: 200 OK
Expected Data: Similar to 2.1 but for February 2026


/*============================================*/
/* STEP 2: MySQL Database Verification       */
/*============================================*/

Reports are generated from existing database tables:
- orders
- order_items
- products
- users

No new tables are required for reports functionality.

2.1 Check User's Purchase History

```sql
-- View user purchases by month
SELECT 
  u.id AS user_id,
  u.name AS user_name,
  DATE_FORMAT(o.order_date, '%Y-%m') AS month,
  COUNT(DISTINCT o.id) AS total_orders,
  SUM(oi.quantity) AS total_items,
  SUM(oi.quantity * oi.price) AS total_spent,
  SUM(oi.quantity * oi.carbon_impact) AS total_carbon
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status != 'CANCELLED'
  AND DATE_FORMAT(o.order_date, '%Y-%m') = '2026-03'
GROUP BY u.id, month;
```

/*------------------------------------*/

2.2 Check User's Category-wise Purchases

```sql
-- User's purchases by category
SELECT 
  p.category,
  COUNT(*) AS item_count,
  SUM(oi.quantity * oi.price) AS total_spent,
  SUM(oi.quantity * oi.carbon_impact) AS total_carbon
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.user_id = 1
  AND o.status != 'CANCELLED'
  AND DATE_FORMAT(o.order_date, '%Y-%m') = '2026-03'
GROUP BY p.category
ORDER BY total_spent DESC;
```

/*------------------------------------*/

2.3 Check Seller's Sales by Month

```sql
-- Seller's sales performance
SELECT 
  u.id AS seller_id,
  u.name AS seller_name,
  DATE_FORMAT(o.order_date, '%Y-%m') AS month,
  COUNT(DISTINCT o.id) AS total_orders,
  SUM(oi.quantity) AS total_items_sold,
  SUM(oi.quantity * oi.price) AS total_revenue,
  SUM(oi.quantity * oi.carbon_impact) AS total_carbon
FROM users u
JOIN products p ON u.id = p.seller_id
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status != 'CANCELLED'
  AND DATE_FORMAT(o.order_date, '%Y-%m') = '2026-03'
  AND u.id = 2
GROUP BY u.id, month;
```

/*------------------------------------*/

2.4 Check Seller's Category-wise Sales

```sql
-- Seller's revenue by category
SELECT 
  p.category,
  COUNT(DISTINCT o.id) AS order_count,
  SUM(oi.quantity) AS items_sold,
  SUM(oi.quantity * oi.price) AS revenue,
  SUM(oi.quantity * oi.carbon_impact) AS total_carbon
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE p.seller_id = 2
  AND o.status != 'CANCELLED'
  AND DATE_FORMAT(o.order_date, '%Y-%m') = '2026-03'
GROUP BY p.category
ORDER BY revenue DESC;
```

/*------------------------------------*/

2.5 Check Daily Sales Data

```sql
-- Daily sales breakdown for seller
SELECT 
  DATE(o.order_date) AS sale_date,
  COUNT(DISTINCT o.id) AS order_count,
  SUM(oi.quantity) AS items_sold,
  SUM(oi.quantity * oi.price) AS daily_revenue
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE p.seller_id = 2
  AND o.status != 'CANCELLED'
  AND DATE_FORMAT(o.order_date, '%Y-%m') = '2026-03'
GROUP BY sale_date
ORDER BY sale_date;
```

/*------------------------------------*/

2.6 Check Carbon Impact Analysis

```sql
-- Eco-rating distribution for seller's products
SELECT 
  p.eco_rating,
  COUNT(*) AS product_count,
  SUM(oi.quantity) AS items_sold,
  SUM(oi.quantity * oi.carbon_impact) AS total_carbon
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE p.seller_id = 2
  AND o.status != 'CANCELLED'
  AND DATE_FORMAT(o.order_date, '%Y-%m') = '2026-03'
GROUP BY p.eco_rating;
```


/*============================================*/
/* STEP 3: Frontend Testing                  */
/*============================================*/

3.1 User Monthly Report Page

Navigation:
- Login as User → Profile Dropdown → "Eco Report"
- Or direct URL: http://localhost:5173/monthly-report

Features to Test:
✅ Month Selector (dropdown with last 6 months)
✅ Summary Cards:
   - Total Orders
   - Items Bought
   - Total Spent
   - Carbon Footprint
✅ Charts:
   - Category Purchase Chart (by items)
   - Category Purchase Chart (by spending)
   - Category Carbon Impact Chart
   - Carbon Impact Summary (tree visualization)
✅ Items Bought Table:
   - Product name, category, seller
   - Quantity, price, total cost
   - Carbon impact, eco rating
   - Order date
✅ AI-Generated Summary:
   - Click "Generate AI Summary" button
   - Shows loading state
   - Displays markdown-formatted summary
   - Cached for 24 hours per month
✅ Download PDF:
   - Click "Download PDF" button
   - Generates PDF with all charts and data
   - Proper pagination and styling

/*------------------------------------*/

3.2 Seller Sales Report Page

Navigation:
- Login as Seller → Profile Dropdown → "Sales Report"
- Or direct URL: http://localhost:5173/seller/report

Features to Test:
✅ Month Selector (dropdown with last 6 months)
✅ Summary Cards:
   - Total Orders
   - Items Sold
   - Total Revenue
   - Carbon Impact
✅ Charts:
   - Revenue by Category Chart
   - Carbon Impact by Category Chart
   - Daily Sales Performance Chart
✅ Items Sold Table:
   - Product name, category, buyer name
   - Quantity, price per unit, total revenue
   - Carbon impact, eco rating
   - Order date
✅ Download PDF:
   - Click "Download PDF" button
   - Generates PDF with all charts and data

/*------------------------------------*/

3.3 Role-Based Navigation

Test navigation bar shows correct report option:

User Role:
- Shows "Eco Report" → /monthly-report

Seller Role:
- Shows "Sales Report" → /seller/report

Admin Role:
- Shows "Eco Report" → /monthly-report (admin can view as user)


/*============================================*/
/* STEP 4: Edge Cases & Error Testing        */
/*============================================*/

4.1 Report for Month with No Data

GET http://localhost:8080/api/reports/user/{userId}/purchases?month=2025-01
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: Report with zero values:
{
  "totalOrders": 0,
  "totalItemsBought": 0,
  "totalSpent": 0.00,
  "totalCarbonFootprint": 0.00,
  "categoryBreakdown": [],
  "itemsBought": []
}

Frontend: Should show "No data available" message

/*------------------------------------*/

4.2 AI Summary Generation Error

Scenario: Gemini API key missing or invalid

POST http://localhost:8080/api/reports/user/{userId}/ai-summary

Expected Response: 500 Internal Server Error
Expected Error: "Failed to generate AI summary: [error details]"

Frontend: Should show error message and fallback to manual report view

/*------------------------------------*/

4.3 Unauthorized Access to Seller Report

POST http://localhost:8080/api/reports/seller/{sellerId}/sales
Headers:
  Authorization: Bearer <user_jwt_token> (not seller)

Expected Response: 403 Forbidden
Error: Access denied

/*------------------------------------*/

4.4 Invalid Month Format

GET http://localhost:8080/api/reports/user/{userId}/purchases?month=2026-13

Expected Response: 400 Bad Request
Error: Invalid month format or value

/*------------------------------------*/

4.5 PDF Generation with No Data

Frontend: Click "Download PDF" on empty report

Expected: Should show message "No data available to generate PDF"
Or: Generate PDF showing "No purchases/sales this month"


/*============================================*/
/* STEP 5: Performance & Integration Tests   */
/*============================================*/

5.1 Report Generation Performance

- Test with user having 50+ orders
- Should generate report within 2-3 seconds
- Database queries should be optimized with JOINs

```sql
-- Check query execution plan
EXPLAIN SELECT ...
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.user_id = ? AND o.order_date BETWEEN ? AND ?;
```

/*------------------------------------*/

5.2 AI Summary Caching

Test AI summary caching:
1. Generate AI summary for March 2026
2. Close and reopen browser
3. View March 2026 report again
4. AI summary should load from localStorage (instant)
5. Check localStorage key: `ecobazaar_ai_summary_2026-03`
6. Wait 24 hours or change month
7. Generate new summary

Cache expiration: 24 hours per month

/*------------------------------------*/

5.3 Multi-User Report Isolation

1. Login as User1, create orders
2. Login as User2, create orders
3. Check User1's report → Should only show User1's data
4. Check User2's report → Should only show User2's data

SQL Verification:
```sql
-- Ensure user_id filter is always applied
SELECT * FROM orders WHERE user_id = 1;  -- User1's orders only
SELECT * FROM orders WHERE user_id = 2;  -- User2's orders only
```

/*------------------------------------*/

5.4 Seller Report - Only Own Products

1. Seller1 creates products
2. Seller2 creates products
3. User orders from both sellers
4. Seller1 views report → Only shows Seller1's product sales
5. Seller2 views report → Only shows Seller2's product sales

SQL Verification:
```sql
-- Check seller_id filter in products
SELECT oi.*, p.name, p.seller_id
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE p.seller_id = 2;  -- Only Seller2's products
```

/*------------------------------------*/

5.5 Chart Rendering with Large Data

Test with:
- User with 100+ items purchased across 7 categories
- Seller with 200+ items sold in a month

Expected: 
- Charts should render without performance issues
- Proper scaling and legends
- Responsive design on mobile


/*============================================*/
/* STEP 6: Integration Flow Testing          */
/*============================================*/

6.1 Complete User Journey

Step 1: User Registration & Login
POST /auth/signup → POST /auth/login

Step 2: Browse & Purchase Products
GET /products/approved → POST /cart/items → POST /orders

Step 3: View Purchase Report
GET /api/reports/user/{userId}/purchases

Step 4: Generate AI Summary
POST /api/reports/user/{userId}/ai-summary

Step 5: Download PDF Report
Frontend: Click "Download PDF"

Verification:
- Report shows recent purchase
- Carbon footprint calculated correctly
- AI summary generated successfully
- PDF downloaded with all data

/*------------------------------------*/

6.2 Complete Seller Journey

Step 1: Seller Registration & Login
POST /auth/signup (role: SELLER) → POST /auth/login

Step 2: Create Products
POST /products → Admin approves

Step 3: Users Purchase Products
(Other users create orders)

Step 4: View Sales Report
GET /api/reports/seller/{sellerId}/sales

Step 5: Download Sales Report PDF
Frontend: Click "Download PDF"

Verification:
- Shows only seller's product sales
- Daily sales chart displays correctly
- Revenue calculations accurate
- PDF includes all charts and tables


/*============================================*/
/* SUMMARY                                    */
/*============================================*/

Milestone 4 Implementation Includes:

✅ User Purchase Reports
  - Monthly purchase history
  - Category-wise breakdown
  - Carbon footprint tracking
  - Items bought table with full details
  - Spending & carbon impact analytics

✅ Seller Sales Reports
  - Monthly sales performance
  - Revenue by category
  - Daily sales trends
  - Items sold table with buyer info
  - Carbon impact by eco-rating

✅ AI-Powered Summaries
  - Gemini API integration
  - Markdown-formatted reports
  - Personalized eco-tips
  - 24-hour caching per month
  - Smart fallback on errors

✅ Frontend Features
  - Interactive month selector
  - Multiple chart types (bar, pie, line)
  - Responsive design
  - PDF export functionality
  - Loading states & error handling

✅ Charts & Visualizations
  - Category Purchase Chart (items/spending)
  - Carbon Impact Summary with tree visualization
  - Daily Sales Chart for sellers
  - Eco-rating distribution
  - Spending summaries

✅ Security & Authorization
  - JWT authentication required
  - Role-based access (User vs Seller)
  - User can only view their own reports
  - Seller can only view their product sales

✅ Performance Optimizations
  - Efficient database queries with JOINs
  - AI summary caching
  - Optimized chart rendering
  - Lazy loading for large datasets

✅ Data Integrity
  - Calculations verified against database
  - Proper handling of cancelled orders
  - Accurate carbon footprint tracking
  - Timestamp-based filtering

✅ User Experience
  - Clear empty states
  - Loading indicators
  - Error messages
  - Smooth PDF generation
  - Mobile-responsive design


/*============================================*/
/* TESTING CHECKLIST                          */
/*============================================*/

Backend API Testing:
☐ User purchase report (current month)
☐ User purchase report (specific month)
☐ User purchase report (empty month)
☐ Seller sales report (current month)
☐ Seller sales report (specific month)
☐ AI summary generation
☐ AI summary error handling
☐ Health check endpoint
☐ Authorization checks
☐ Invalid month format handling

Database Verification:
☐ User purchases query accuracy
☐ Seller sales query accuracy
☐ Category breakdown calculations
☐ Daily sales aggregation
☐ Carbon impact totals
☐ Data isolation per user/seller

Frontend Testing:
☐ Month selector functionality
☐ Summary cards display
☐ All charts render correctly
☐ Items table with pagination
☐ AI summary generation button
☐ PDF export functionality
☐ Empty state handling
☐ Loading states
☐ Error messages
☐ Mobile responsiveness

Integration Testing:
☐ End-to-end user purchase flow
☐ End-to-end seller sales flow
☐ Role-based navigation
☐ AI summary caching
☐ Multi-user data isolation
☐ Report updates after new orders
