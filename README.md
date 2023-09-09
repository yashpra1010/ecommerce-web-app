# SwiftCart (Backend)
SwiftCart is an ecommerce website. This repo consists of backend using NodeJS + ExpressJS + Mongoose
---
# API - Routes

### Authorization
```
POST /api/user/register
POST /api/user/forgot-password-token
PUT /api/user/reset-password/:token
PUT /api/user/password
POST /api/user/login
POST /api/user/admin-login
POST /api/user/cart
POST /api/user/cart/applycoupon
POST /api/user/cart/cash-order
GET /api/user/all-users
GET /api/user/get-orders
GET /api/user/getallorders
POST /api/user/getorderbyuser/:id
GET /api/user/refresh
GET /api/user/logout
GET /api/user/wishlist
GET /api/user/cart
GET /api/user/:id
DELETE /api/user/empty-cart
DELETE /api/user/:id
PUT /api/user/order/update-order/:id
PUT /api/user/edit-user
PUT /api/user/save-address
PUT /api/user/block-user/:id
PUT /api/user/unblock-user/:id
```
### Blog Category
```
POST /api/blogcategory/
PUT /api/blogcategory/:id
DELETE /api/blogcategory/:id
GET /api/blogcategory/:id
GET /api/blogcategory/
```
### Blog
```
POST /api/blog/
PUT /api/blog/upload/:id
PUT /api/blog/likes
PUT /api/blog/dislikes
PUT /api/blog/:id
GET /api/blog/:id
GET /api/blog/
DELETE /api/blog/:id
```
### Brand
```
POST /api/brand/
PUT /api/brand/:id
DELETE /api/brand/:id
GET /api/brand/:id
GET /api/brand/
```
### Category
```
POST /api/category/
PUT /api/category/:id
DELETE /api/category/:id
GET /api/category/:id
GET /api/category/
```

### Color
```
POST /api/color/
PUT /api/color/:id
DELETE /api/color/:id"
GET /api/color/:id
GET /api/color/
```
### Coupon
```
POST /api/coupon/
GET /api/coupon/
GET /api/coupon/:id
PUT /api/coupon/:id
DELETE /api/coupon/:id
```
### Enquiry
```
POST /api/enquiry/
PUT /api/enquiry/:id
DELETE /api/enquiry/:id
GET /api/enquiry/:id
GET /api/enquiry/
```

### Product
```
GET /api/product/
GET /api/product/:id
PUT /api/product/wishlist
PUT /api/product/rating
POST /api/product/
PUT /api/product/:id
DELETE /api/product/:id
```
### Upload Images
```
DELETE /api/upload/delete-img/:id
```

### List of ENVs
- MONGODB_URI
- JWT_SECRET
- SMTP_HOST
- SMTP_EMAIL
- SMTP_PASSWORD
