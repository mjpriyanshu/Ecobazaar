MILESTONE 1 : LOGIN AND AUTHENTICATON


STEP 0: Authentication - Get JWT Token

0.1 Register Seller Account (if not exists)

POST http://localhost:8080/auth/signup
Content-Type: application/json

Body:
{
  "name": "Seller1",
  "email": "seller@gmail.com",
  "password": "123456",
  "role": "SELLER"
}

Expected Response: 200 OK
Expected Data: "Signup successful"


/*-------------------------------------------*/

0.2 Login as Seller

POST http://localhost:8080/auth/login
Content-Type: application/json

Body:
{
  "email": "seller@gmail.com",
  "password": "123456"
}

Expected Response: 200 OK
Expected Data: 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "seller@gmail.com",
  "name": "Seller1",
  "role": "SELLER",
  "ecoScore": 0,
  "verified": false
}

**Copy the token value and use it in Authorization header for subsequent requests**


/*-------------------------------------------*/

0.3 Login as Admin (First create admin user in DB)

POST http://localhost:8080/auth/login
Content-Type: application/json

Body:
{
  "email": "admin@gmail.com",
  "password": "admin123"
}

Expected Response: 200 OK
Expected Data: Token with ADMIN role

**Use this token for admin-only endpoints like product approval**


/*-------------------------------------------*/

0.4 Get User Profile (Requires Token)

GET http://localhost:8080/api/user/profile
Headers:
  Authorization: Bearer <your_jwt_token>

Expected Response: 200 OK
Expected Data: Current user details


/*-------------------------------------------*/













MILESTONE 2 


Step 1: Postman Testing - API Endpoints

First, you'll need the JWT token from your auth system. Then test these scenarios:


1.1 Create Product (Seller)

Seller id : seller@gmail.com
password: 123456

POST http://localhost:8080/products
Headers:
  Authorization: Bearer <your_jwt_token>
  Content-Type: application/json

Body:
{
  "name": "Solar Power Bank",
  "description": "Portable solar-powered charger",
  "category": "ELECTRONICS",
  "price": 2999,
  "stock": 30,
  "carbonImpact": 3.5,
  "imageUrl": "/img_assets/placeholder.jpg"
}

Expected Response: 201 Created
Expected Data: Product with eco_rating = "MODERATE", eco_certified = false, approved = false

/*------------------------------------*/

1.2 Get all approved products ( public)

GET http://localhost:8080/products/approved

Expected Response: 200 OK
Expected Data: Array of approved products only


/*----------------------------------*/

1.3 search products

GET http://localhost:8080/products/search?keyword=bamboo

Expected Response: 200 OK
Expected Data: Products matching "bamboo" in name/description

/*-----------------------------------*/

1.4 filter by eco rating

GET http://localhost:8080/products/filter/eco-rating?rating=ECO_FRIENDLY

Expected Response: 200 OK
Expected Data: Only eco-friendly products (carbon < 2 kg)

/*-------------------------------------------*/

1.5 filter by category

GET http://localhost:8080/products/category/ELECTRONICS

Expected Response: 200 OK
Expected Data: Only electronics products



/*-------------------------------------------*/

1.6 Get products sorted by carbon impact

GET http://localhost:8080/products/eco-sorted

Expected Response: 200 OK
Expected Data: Products ordered by lowest carbon impact first

/*-------------------------------------------*/

1.7 update product ( seller )

PUT http://localhost:8080/products/1
Headers:
  Authorization: Bearer <seller_jwt_token>
  Content-Type: application/json

Body:
{
  "name": "Bamboo Toothbrush - Updated",
  "description": "Premium eco-friendly biodegradable toothbrush",
  "category": "BEAUTY",
  "price": 699,
  "stock": 150,
  "carbonImpact": 0.8
}

Expected Response: 200 OK
Expected Data: Updated product with recalculated eco_rating


/*------------------------------------------------*/

1.8 Approve products (Admin)

PUT http://localhost:8080/products/admin/3/approve
Headers:
  Authorization: Bearer <admin_jwt_token>

Expected Response: 200 OK
Expected Data: Product with approved = true

/*------------------------------------------------*/

1.9 Get eco-certified products (PUBLIC - No Auth)

GET http://localhost:8080/products/eco-certified

Expected Response: 200 OK
Expected Data: Only products with eco_certified = true



/*------------------------------------------------*/


1.10 Delete product (seller)

DELETE http://localhost:8080/products/1
Headers:
  Authorization: Bearer <seller_jwt_token>

Expected Response: 204 No Content


/*------------------------------------------------*/

1.11 Get My Products (Seller - Own Products)

GET http://localhost:8080/products/my-products
Headers:
  Authorization: Bearer <seller_jwt_token>

Expected Response: 200 OK
Expected Data: Array of products owned by seller


/*------------------------------------------------*/

1.12 Get All Products (Admin - Including Unapproved)

GET http://localhost:8080/products/admin/all
Headers:
  Authorization: Bearer <admin_jwt_token>

Expected Response: 200 OK
Expected Data: All products including pending approval


/*------------------------------------------------*/

1.13 Get Pending Products (Admin)

GET http://localhost:8080/products/admin/pending
Headers:
  Authorization: Bearer <admin_jwt_token>

Expected Response: 200 OK
Expected Data: Only products awaiting approval


/*------------------------------------------------*/


SQL TESTING MILESTONE 2;

BYCRYPT PASSWORD GENERATOR  : https://bcrypt-generator.com 


select * from products;

-- 1. Verify products table structure
DESCRIBE products; 

-- 2. Check foreign key relationship
SHOW CREATE TABLE products;

-- 3. Insert test seller (if not exists)
INSERT INTO users (name, email, password, role, eco_score, verified, created_at)
VALUES ('Seller1', 'seller@gmail.com', '$2a$10$HB7/uVjxXl/6925yjv7sP.DHwD5S7wXfhzfQO94ymtwzj5r29M73G', 'SELLER', 0, 1, NOW());

-- 4. Get seller ID
SELECT id, name, email, role FROM users WHERE email = 'seller@gmail.com';

-- 5. Insert test products with different eco-ratings and local image URLs
INSERT INTO products (name, description, category, price, stock, carbon_impact, eco_certified, eco_rating, approved, seller_id, image_url, created_at, updated_at)
VALUES 
('Bamboo Toothbrush', 'Eco-friendly biodegradable toothbrush', 'BEAUTY', 499, 100, 0.5, 1, 'ECO_FRIENDLY', 1, 1, '/img_assets/bambbrush.jpg', NOW(), NOW()),
('Organic Cotton T-Shirt', 'Organic cotton sustainable t-shirt', 'CLOTHING', 1499, 50, 5.0, 0, 'MODERATE', 1, 1, '/img_assets/Tshirt.jpg', NOW(), NOW()),
('Reusable Water Bottle', 'Stainless steel water bottle', 'HOME_GARDEN', 899, 75, 1.2, 1, 'ECO_FRIENDLY', 1, 1, '/img_assets/bottle.jpg', NOW(), NOW()),
('Bamboo Cutting Board', 'Perfect for your kitchen', 'HOME_GARDEN', 1199, 30, 0.8, 1, 'ECO_FRIENDLY', 1, 1, '/img_assets/cuttinboard.jpg', NOW(), NOW()),
('Laptop Computer', 'High-performance laptop', 'ELECTRONICS', 75999, 20, 150.0, 0, 'HIGH_IMPACT', 0, 1, '/img_assets/placeholder.jpg', NOW(), NOW());

-- 6. Verify inserted products
SELECT id, name, category, price, carbon_impact, eco_rating, eco_certified, approved 
FROM products;

-- 7. Test queries used by repository
SELECT * FROM products WHERE approved = 1;
SELECT * FROM products WHERE eco_certified = 1;
SELECT * FROM products WHERE eco_rating = 'ECO_FRIENDLY';
SELECT * FROM products WHERE carbon_impact <= 10.0;

-- 8. Test search query
SELECT * FROM products 
WHERE (LOWER(name) LIKE '%bamboo%' OR LOWER(description) LIKE '%bamboo%') 
AND approved = 1;


/*================================================*/
/*         AVAILABLE IMAGE ASSETS                 */
/*================================================*/

Available images in public/img_assets/:
- /img_assets/Tshirt.jpg - Organic cotton t-shirt
- /img_assets/bambbrush.jpg - Bamboo toothbrush
- /img_assets/bottle.jpg - Reusable water bottle
- /img_assets/cuttinboard.jpg - Bamboo cutting board
- /img_assets/main_bg.jpg - Hero section background
- /img_assets/placeholder.jpg - Placeholder (create if needed)

Use these URLs when creating products for consistent styling!


/*================================================*/
/*         FRONTEND TESTING CHECKLIST             */
/*================================================*/

FRONTEND SETUP
--------------

1. Start Backend Server
   cd a:\01.Programming\Springboot\ecobazaar
   .\mvnw spring-boot:run
   
   Expected: Backend running on http://localhost:8080

2. Start Frontend Development Server
   cd a:\01.Programming\Springboot\ecobazaar-frontend
   npm run dev
   
   Expected: Frontend running on http://localhost:5173




REMAINING FEATURES (NOT YET IMPLEMENTED)
-----------------------------------------

❌ Product Detail Page (/products/:id)
   - Individual product view
   - Carbon footprint breakdown visualization
   - Add to cart functionality
   
✅ Product Form (Seller) - COMPLETED
   ✓ /seller/product/new - Create new product
   ✓ /seller/product/edit/:id - Edit existing product
   ✓ Form with all product fields
   ❌ Image upload functionality (currently URL-based)
   
❌ Shopping Cart
   - Add/remove products
   - Quantity management
   - Checkout process

