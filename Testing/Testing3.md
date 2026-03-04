MILESTONE 3 - CART, CHECKOUT & ORDERS


Step 1: Postman Testing - API Endpoints

You'll need JWT token for authenticated requests.

User credentials:
- Email: user@gmail.com
- Password: 123456

Seller credentials:
- Email: seller@gmail.com  
- Password: 123456

/*============================================*/
/* PART 1: CART OPERATIONS                    */
/*============================================*/

1.1 Get User's Cart (Empty initially)

GET http://localhost:8080/cart
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: 
{
  "id": 1,
  "items": [],
  "totalItems": 0,
  "totalPrice": 0.00,
  "totalCarbon": 0.00
}

/*------------------------------------*/

1.2 Add Product to Cart

POST http://localhost:8080/cart/items
Headers:
  Authorization: Bearer <user_jwt_token>
  Content-Type: application/json

Body:
{
  "productId": 1,
  "quantity": 2
}

Expected Response: 200 OK
Expected Data: Cart with items array containing the product

/*------------------------------------*/

1.3 Get Cart (With Items)

GET http://localhost:8080/cart
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: 
{
  "id": 1,
  "items": [
    {
      "id": 1,
      "product": {...},
      "quantity": 2,
      "price": <price_at_add_time>,
      "carbonImpact": <carbon_at_add_time>
    }
  ],
  "totalItems": 2,
  "totalPrice": <calculated_total>,
  "totalCarbon": <calculated_carbon>
}

/*------------------------------------*/

1.4 Update Cart Item Quantity

PUT http://localhost:8080/cart/items/{cartItemId}
Headers:
  Authorization: Bearer <user_jwt_token>
  Content-Type: application/json

Body:
{
  "quantity": 5
}

Expected Response: 200 OK
Expected Data: Updated cart with new quantity and recalculated totals

/*------------------------------------*/

1.5 Remove Item from Cart

DELETE http://localhost:8080/cart/items/{cartItemId}
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: Cart without the removed item

/*------------------------------------*/

1.6 Clear Cart

DELETE http://localhost:8080/cart
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: Empty cart (items = [])


/*============================================*/
/* PART 2: GREEN RECOMMENDATIONS             */
/*============================================*/

2.1 Get Greener Alternatives for Product

GET http://localhost:8080/products/{productId}/greener-alternatives

Expected Response: 200 OK
Expected Data: Array of products in same category with lower carbon impact
Note: Products sorted by carbon impact (lowest first), max 5 results

/*------------------------------------*/

2.2 Calculate Carbon Savings

GET http://localhost:8080/products/carbon-savings?currentProductId=5&alternativeProductId=3&quantity=2

Expected Response: 200 OK
Expected Data:
{
  "currentCarbon": 10.0,
  "alternativeCarbon": 4.0,
  "carbonSavings": 6.0,
  "savingsPercentage": 60.0,
  "quantity": 2
}

/*------------------------------------*/

2.3 Get Eco-Friendly Recommendations

GET http://localhost:8080/products/recommendations/eco-friendly?limit=10

Expected Response: 200 OK
Expected Data: Top eco-friendly products (eco_rating = 'ECO_FRIENDLY')

/*------------------------------------*/

2.4 Get Cart-Based Recommendations

GET http://localhost:8080/cart/recommendations
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: Array of recommendations with greener alternatives for cart items
[
  {
    "currentProduct": {...},
    "alternatives": [...],
    "potentialSavings": 2.5
  }
]


/*============================================*/
/* PART 3: ORDER OPERATIONS                  */
/*============================================*/

3.1 Create Order (Checkout)

Prerequisites: Cart must have items

POST http://localhost:8080/orders
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 201 Created
Expected Data: 
{
  "id": 1,
  "orderDate": "2026-01-25T...",
  "status": "PENDING",
  "totalAmount": <cart_total>,
  "totalCarbon": <cart_carbon>,
  "items": [
    {
      "id": 1,
      "product": {...},
      "quantity": 2,
      "price": <price_snapshot>,
      "carbonImpact": <carbon_snapshot>
    }
  ]
}

Note: Cart is cleared after order creation

/*------------------------------------*/

3.2 Get My Orders (User)

GET http://localhost:8080/orders/my-orders
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: Array of user's orders, sorted by date (newest first)

/*------------------------------------*/

3.3 Get Order by ID

GET http://localhost:8080/orders/{orderId}
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: Complete order details with items

/*------------------------------------*/

3.4 Cancel Order

PUT http://localhost:8080/orders/{orderId}/cancel
Headers:
  Authorization: Bearer <user_jwt_token>

Expected Response: 200 OK
Expected Data: Order with status = "CANCELLED"

Note: Product stock is restored when order is cancelled

/*------------------------------------*/

3.5 Get All Orders (Admin)

GET http://localhost:8080/orders/admin/all
Headers:
  Authorization: Bearer <admin_jwt_token>

Expected Response: 200 OK
Expected Data: All orders from all users

/*------------------------------------*/

3.6 Update Order Status (Admin)

PUT http://localhost:8080/orders/admin/{orderId}/status
Headers:
  Authorization: Bearer <admin_jwt_token>
  Content-Type: application/json

Body:
{
  "status": "SHIPPED"
}

Valid statuses: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED

Expected Response: 200 OK
Expected Data: Updated order

/*------------------------------------*/

3.7 Get Orders by Status (Admin)

GET http://localhost:8080/orders/admin/status/PENDING
Headers:
  Authorization: Bearer <admin_jwt_token>

Expected Response: 200 OK
Expected Data: All orders with PENDING status

/*------------------------------------*/

3.8 Get Seller Orders

GET http://localhost:8080/orders/seller/my-orders
Headers:
  Authorization: Bearer <seller_jwt_token>

Expected Response: 200 OK
Expected Data: Orders containing seller's products


/*============================================*/
/* STEP 2: MySQL Database Verification       */
/*============================================*/

2.1 Check Carts Table

```sql
-- View all carts
SELECT * FROM carts;

-- View cart with user details
SELECT 
  c.id AS cart_id,
  u.email AS user_email,
  c.total_items,
  c.total_price,
  c.total_carbon
FROM carts c
JOIN users u ON c.user_id = u.id;
```

/*------------------------------------*/

2.2 Check Cart Items Table

```sql
-- View all cart items
SELECT * FROM cart_items;

-- View cart items with product details
SELECT 
  ci.id,
  ci.cart_id,
  p.name AS product_name,
  ci.quantity,
  ci.price AS price_snapshot,
  ci.carbon_impact AS carbon_snapshot,
  (ci.quantity * ci.price) AS item_total
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
ORDER BY ci.cart_id, ci.id;

-- Check total calculation
SELECT 
  cart_id,
  COUNT(*) AS item_count,
  SUM(quantity) AS total_quantity,
  SUM(quantity * price) AS calculated_price,
  SUM(quantity * carbon_impact) AS calculated_carbon
FROM cart_items
GROUP BY cart_id;
```

/*------------------------------------*/

2.3 Check Orders Table

```sql
-- View all orders
SELECT * FROM orders;

-- View orders with user details
SELECT 
  o.id,
  o.order_date,
  o.status,
  u.email AS customer_email,
  o.total_amount,
  o.total_carbon,
  COUNT(oi.id) AS item_count
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id
ORDER BY o.order_date DESC;

-- Orders by status
SELECT 
  status,
  COUNT(*) AS order_count,
  SUM(total_amount) AS total_revenue
FROM orders
GROUP BY status;
```

/*------------------------------------*/

2.4 Check Order Items Table

```sql
-- View all order items
SELECT * FROM order_items;

-- View order items with product details
SELECT 
  oi.id,
  oi.order_id,
  o.order_date,
  o.status,
  p.name AS product_name,
  oi.quantity,
  oi.price AS price_snapshot,
  oi.carbon_impact AS carbon_snapshot,
  (oi.quantity * oi.price) AS item_total
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
JOIN products p ON oi.product_id = p.id
ORDER BY o.order_date DESC, oi.id;

-- Verify order totals match
SELECT 
  o.id AS order_id,
  o.total_amount AS recorded_total,
  SUM(oi.quantity * oi.price) AS calculated_total,
  o.total_carbon AS recorded_carbon,
  SUM(oi.quantity * oi.carbon_impact) AS calculated_carbon
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;
```

/*------------------------------------*/

2.5 Check Stock Management

```sql
-- Products with low stock
SELECT 
  id,
  name,
  stock,
  category
FROM products
WHERE stock < 10
ORDER BY stock ASC;

-- Stock movements (orders vs available)
SELECT 
  p.id,
  p.name,
  p.stock AS current_stock,
  COALESCE(SUM(oi.quantity), 0) AS total_ordered,
  (p.stock + COALESCE(SUM(oi.quantity), 0)) AS original_stock
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id
WHERE o.status != 'CANCELLED' OR o.status IS NULL
GROUP BY p.id;
```

/*------------------------------------*/

2.6 Green Recommendations Query

```sql
-- Find greener alternatives for a product
SET @product_id = 1;

SELECT 
  p1.name AS original_product,
  p1.category,
  p1.carbon_impact AS original_carbon,
  p2.name AS alternative,
  p2.carbon_impact AS alternative_carbon,
  (p1.carbon_impact - p2.carbon_impact) AS carbon_savings,
  ROUND(((p1.carbon_impact - p2.carbon_impact) / p1.carbon_impact * 100), 2) AS savings_percentage
FROM products p1
JOIN products p2 ON p1.category = p2.category
WHERE p1.id = @product_id
  AND p2.id != @product_id
  AND p2.carbon_impact < p1.carbon_impact
  AND p2.approved = true
  AND p2.stock > 0
ORDER BY p2.carbon_impact ASC
LIMIT 5;

-- Most eco-friendly products
SELECT 
  name,
  category,
  price,
  carbon_impact,
  eco_rating,
  stock
FROM products
WHERE approved = true
  AND stock > 0
  AND eco_rating = 'ECO_FRIENDLY'
ORDER BY carbon_impact ASC
LIMIT 10;
```

/*------------------------------------*/

2.7 Carbon Impact Analysis

```sql
-- Total carbon impact by user
SELECT 
  u.email,
  COUNT(o.id) AS total_orders,
  SUM(o.total_carbon) AS total_carbon_footprint,
  AVG(o.total_carbon) AS avg_carbon_per_order
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status != 'CANCELLED'
GROUP BY u.id
ORDER BY total_carbon_footprint DESC;

-- Carbon savings potential in current carts
SELECT 
  u.email,
  c.total_carbon AS current_cart_carbon,
  COUNT(ci.id) AS items_count
FROM users u
JOIN carts c ON u.id = c.user_id
JOIN cart_items ci ON c.id = ci.cart_id
GROUP BY u.id
HAVING COUNT(ci.id) > 0;
```

/*------------------------------------*/

2.8 Test Data Validation

```sql
-- Verify data integrity
-- 1. Cart items should reference existing products
SELECT ci.id, ci.product_id
FROM cart_items ci
LEFT JOIN products p ON ci.product_id = p.id
WHERE p.id IS NULL;

-- 2. Order items should reference existing products
SELECT oi.id, oi.product_id
FROM order_items oi
LEFT JOIN products p ON oi.product_id = p.id
WHERE p.id IS NULL;

-- 3. Carts should belong to existing users
SELECT c.id, c.user_id
FROM carts c
LEFT JOIN users u ON c.user_id = u.id
WHERE u.id IS NULL;

-- 4. Orders should belong to existing users
SELECT o.id, o.user_id
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;

-- All should return empty results
```


/*============================================*/
/* STEP 3: Testing Workflows                 */
/*============================================*/

3.1 Complete Purchase Flow

Step 1: Login as User
POST http://localhost:8080/auth/login
Body: {"email": "user@gmail.com", "password": "123456"}
→ Save JWT token

Step 2: Browse Products
GET http://localhost:8080/products/approved

Step 3: Add to Cart (multiple items)
POST http://localhost:8080/cart/items
Body: {"productId": 1, "quantity": 2}
→ Repeat for different products

Step 4: View Cart
GET http://localhost:8080/cart

Step 5: Get Green Recommendations
GET http://localhost:8080/cart/recommendations

Step 6: Update Quantities (if needed)
PUT http://localhost:8080/cart/items/{cartItemId}
Body: {"quantity": 3}

Step 7: Checkout
POST http://localhost:8080/orders

Step 8: View Order Confirmation
GET http://localhost:8080/orders/my-orders

Verification:
- Check cart is empty: GET http://localhost:8080/cart
- Check product stock reduced: GET http://localhost:8080/products/{productId}
- Check order in database: SELECT * FROM orders WHERE id = <order_id>

/*------------------------------------*/

3.2 Order Cancellation Flow

Step 1: Create order (follow 3.1 steps 1-7)

Step 2: Note product stock before cancellation
GET http://localhost:8080/products/{productId}

Step 3: Cancel order
PUT http://localhost:8080/orders/{orderId}/cancel

Step 4: Verify stock restored
GET http://localhost:8080/products/{productId}

Verification:
- Order status should be CANCELLED
- Product stock should increase by ordered quantity

/*------------------------------------*/

3.3 Admin Order Management Flow

Step 1: Login as Admin
POST http://localhost:8080/auth/login
Body: {"email": "admin@gmail.com", "password": "123456"}

Step 2: View all pending orders
GET http://localhost:8080/orders/admin/status/PENDING

Step 3: Update order status to CONFIRMED
PUT http://localhost:8080/orders/admin/{orderId}/status
Body: {"status": "CONFIRMED"}

Step 4: Update to SHIPPED
PUT http://localhost:8080/orders/admin/{orderId}/status
Body: {"status": "SHIPPED"}

Step 5: Update to DELIVERED
PUT http://localhost:8080/orders/admin/{orderId}/status
Body: {"status": "DELIVERED"}

/*------------------------------------*/

3.4 Seller Order View Flow

Step 1: Login as Seller
POST http://localhost:8080/auth/login
Body: {"email": "seller@gmail.com", "password": "123456"}

Step 2: Create products (if not already created)
POST http://localhost:8080/products

Step 3: Admin approves products
(Use admin account to approve)

Step 4: User orders seller's products
(Use user account to create orders)

Step 5: Seller views their orders
GET http://localhost:8080/orders/seller/my-orders


/*============================================*/
/* STEP 4: Edge Cases & Error Testing        */
/*============================================*/

4.1 Add Product with Insufficient Stock

POST http://localhost:8080/cart/items
Body: {"productId": 1, "quantity": 9999}

Expected: 400 Bad Request
Error: "Insufficient stock"

/*------------------------------------*/

4.2 Add Non-Existent Product

POST http://localhost:8080/cart/items
Body: {"productId": 99999, "quantity": 1}

Expected: 400 Bad Request
Error: "Product not found"

/*------------------------------------*/

4.3 Update Non-Existent Cart Item

PUT http://localhost:8080/cart/items/99999
Body: {"quantity": 2}

Expected: 400 Bad Request
Error: "Cart item not found"

/*------------------------------------*/

4.4 Checkout with Empty Cart

DELETE http://localhost:8080/cart
Then:
POST http://localhost:8080/orders

Expected: 400 Bad Request
Error: "Cart is empty"

/*------------------------------------*/

4.5 Cancel Already Cancelled Order

PUT http://localhost:8080/orders/{orderId}/cancel
Then again:
PUT http://localhost:8080/orders/{orderId}/cancel

Expected: 400 Bad Request
Error: "Order is already cancelled"

/*------------------------------------*/

4.6 Access Other User's Order

Step 1: Create order with user1
Step 2: Login as user2
Step 3: Try to access user1's order
GET http://localhost:8080/orders/{user1_order_id}

Expected: 400 Bad Request
Error: "Order not found" (security: don't reveal it exists)

/*------------------------------------*/

4.7 Unauthorized Access

GET http://localhost:8080/cart
(Without Authorization header)

Expected: 403 Forbidden


/*============================================*/
/* STEP 5: Performance Verification          */
/*============================================*/

5.1 Verify Cart Totals Calculation

```sql
-- For each cart, verify calculated totals match stored totals
SELECT 
  c.id,
  c.total_items AS stored_items,
  COALESCE(SUM(ci.quantity), 0) AS calculated_items,
  c.total_price AS stored_price,
  COALESCE(SUM(ci.quantity * ci.price), 0) AS calculated_price,
  c.total_carbon AS stored_carbon,
  COALESCE(SUM(ci.quantity * ci.carbon_impact), 0) AS calculated_carbon,
  CASE 
    WHEN c.total_items = COALESCE(SUM(ci.quantity), 0) 
      AND ABS(c.total_price - COALESCE(SUM(ci.quantity * ci.price), 0)) < 0.01
      AND ABS(c.total_carbon - COALESCE(SUM(ci.quantity * ci.carbon_impact), 0)) < 0.01
    THEN 'OK'
    ELSE 'MISMATCH'
  END AS status
FROM carts c
LEFT JOIN cart_items ci ON c.id = ci.cart_id
GROUP BY c.id;
```

/*------------------------------------*/

5.2 Verify Order Totals Calculation

```sql
-- For each order, verify calculated totals match stored totals
SELECT 
  o.id,
  o.total_amount AS stored_amount,
  COALESCE(SUM(oi.quantity * oi.price), 0) AS calculated_amount,
  o.total_carbon AS stored_carbon,
  COALESCE(SUM(oi.quantity * oi.carbon_impact), 0) AS calculated_carbon,
  CASE 
    WHEN ABS(o.total_amount - COALESCE(SUM(oi.quantity * oi.price), 0)) < 0.01
      AND ABS(o.total_carbon - COALESCE(SUM(oi.quantity * oi.carbon_impact), 0)) < 0.01
    THEN 'OK'
    ELSE 'MISMATCH'
  END AS status
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;
```


/*============================================*/
/* SUMMARY                                    */
/*============================================*/

Milestone 3 Implementation Includes:

✅ Cart System
  - Add/Update/Remove items
  - Automatic total calculation (price & carbon)
  - Stock validation

✅ Green Recommendations
  - Greener alternatives by category
  - Carbon savings calculator
  - Cart-based recommendations

✅ Order System
  - Create orders from cart
  - View order history
  - Cancel orders with stock restoration
  - Admin order management
  - Seller order views

✅ Database Tables
  - carts (user_id, totals)
  - cart_items (cart_id, product_id, quantity, snapshots)
  - orders (user_id, status, totals, order_date)
  - order_items (order_id, product_id, quantity, snapshots)

✅ Security
  - JWT authentication required
  - User can only access their own cart/orders
  - Admin has full access
  - Seller sees orders containing their products

✅ Business Logic
  - Stock management with validation
  - Price & carbon snapshots at order time
  - Order status workflow (PENDING → CONFIRMED → SHIPPED → DELIVERED)
  - Cancel with stock restoration
