# SwiftCart

SwiftCart is an ecommerce website backend. This repo consists of backend using NodeJS + ExpressJS + Mongoose

## API - Routes

### User

| Sr. No. | Description             | Request Type | Endpoint                               |
|---------|-------------------------|--------------|----------------------------------------|
| 1       | User Registration       | POST         | `/api/user/register`                  |
| 2       | Forgot Password Token   | POST         | `/api/user/forgot-password-token`     |
| 3       | Reset Password          | PUT          | `/api/user/reset-password/:token`     |
| 4       | Update Password         | PUT          | `/api/user/password`                  |
| 5       | User Login              | POST         | `/api/user/login`                     |
| 6       | Admin Login             | POST         | `/api/user/admin-login`               |
| 7       | User Cart               | POST         | `/api/user/cart`                      |
| 8       | Apply Coupon to Cart    | POST         | `/api/user/cart/applycoupon`          |
| 9       | Place Cash Order        | POST         | `/api/user/cart/cash-order`           |
| 10      | Get All Users           | GET          | `/api/user/all-users`                 |
| 11      | Get User Orders         | GET          | `/api/user/get-orders`                |
| 12      | Get All Orders          | GET          | `/api/user/getallorders`              |
| 13      | Get Orders by User      | POST         | `/api/user/getorderbyuser/:id`        |
| 14      | Refresh Token           | GET          | `/api/user/refresh`                   |
| 15      | Logout                  | GET          | `/api/user/logout`                    |
| 16      | Get Wishlist            | GET          | `/api/user/wishlist`                  |
| 17      | Get User Cart           | GET          | `/api/user/cart`                      |
| 18      | Get User by ID          | GET          | `/api/user/:id`                       |
| 19      | Empty User Cart         | DELETE       | `/api/user/empty-cart`                |
| 20      | Delete User             | DELETE       | `/api/user/:id`                       |
| 21      | Update Order            | PUT          | `/api/user/order/update-order/:id`    |
| 22      | Edit User               | PUT          | `/api/user/edit-user`                 |
| 23      | Save User Address       | PUT          | `/api/user/save-address`              |
| 24      | Block User              | PUT          | `/api/user/block-user/:id`            |
| 25      | Unblock User            | PUT          | `/api/user/unblock-user/:id`          |


### Blog Category
| Sr. No. | Description              | Request Type | Endpoint                    |
|---------|--------------------------|--------------|-----------------------------|
| 1       | Create Blog Category     | POST         | `/api/blogcategory/`        |
| 2       | Update Blog Category     | PUT          | `/api/blogcategory/:id`     |
| 3       | Delete Blog Category     | DELETE       | `/api/blogcategory/:id`     |
| 4       | Get Blog Category by ID  | GET          | `/api/blogcategory/:id`     |
| 5       | Get All Blog Categories  | GET          | `/api/blogcategory/`        |


### Blog
| Sr. No. | Description            | Request Type | Endpoint                  |
|---------|------------------------|--------------|---------------------------|
| 1       | Create Blog            | POST         | `/api/blog/`              |
| 2       | Update Blog Content    | PUT          | `/api/blog/upload/:id`    |
| 3       | Like Blog              | PUT          | `/api/blog/likes`         |
| 4       | Dislike Blog           | PUT          | `/api/blog/dislikes`      |
| 5       | Update Blog            | PUT          | `/api/blog/:id`           |
| 6       | Get Blog by ID         | GET          | `/api/blog/:id`           |
| 7       | Get All Blogs          | GET          | `/api/blog/`              |
| 8       | Delete Blog            | DELETE       | `/api/blog/:id`           |


### Brand
| Sr. No. | Description          | Request Type | Endpoint              |
|---------|----------------------|--------------|-----------------------|
| 1       | Create Brand         | POST         | `/api/brand/`         |
| 2       | Update Brand         | PUT          | `/api/brand/:id`      |
| 3       | Delete Brand         | DELETE       | `/api/brand/:id`      |
| 4       | Get Brand by ID      | GET          | `/api/brand/:id`      |
| 5       | Get All Brands       | GET          | `/api/brand/`         |


### Category
| Sr. No. | Description           | Request Type | Endpoint                |
|---------|-----------------------|--------------|-------------------------|
| 1       | Create Category       | POST         | `/api/category/`        |
| 2       | Update Category       | PUT          | `/api/category/:id`     |
| 3       | Delete Category       | DELETE       | `/api/category/:id`     |
| 4       | Get Category by ID    | GET          | `/api/category/:id`     |
| 5       | Get All Categories    | GET          | `/api/category/`        |

### Color

| Sr. No. | Description        | Request Type | Endpoint            |
|---------|--------------------|--------------|---------------------|
| 1       | Create Color       | POST         | `/api/color/`       |
| 2       | Update Color       | PUT          | `/api/color/:id`    |
| 3       | Delete Color       | DELETE       | `/api/color/:id`    |
| 4       | Get Color by ID    | GET          | `/api/color/:id`    |
| 5       | Get All Colors     | GET          | `/api/color/`       |

### Coupon

| Sr. No. | Description          | Request Type | Endpoint            |
|---------|----------------------|--------------|---------------------|
| 1       | Create Coupon        | POST         | `/api/coupon/`      |
| 2       | Get All Coupons     | GET          | `/api/coupon/`      |
| 3       | Get Coupon by ID     | GET          | `/api/coupon/:id`   |
| 4       | Update Coupon        | PUT          | `/api/coupon/:id`   |
| 5       | Delete Coupon        | DELETE       | `/api/coupon/:id`   |

### Enquiry

| Sr. No. | Description         | Request Type | Endpoint            |
|---------|---------------------|--------------|---------------------|
| 1       | Create Enquiry      | POST         | `/api/enquiry/`    |
| 2       | Update Enquiry      | PUT          | `/api/enquiry/:id` |
| 3       | Delete Enquiry      | DELETE       | `/api/enquiry/:id` |
| 4       | Get Enquiry by ID   | GET          | `/api/enquiry/:id` |
| 5       | Get All Enquiries   | GET          | `/api/enquiry/`    |

### Product

| Sr. No. | Description         | Request Type | Endpoint               |
|---------|---------------------|--------------|------------------------|
| 1       | Get All Products   | GET          | `/api/product/`        |
| 2       | Get Product by ID  | GET          | `/api/product/:id`     |
| 3       | Add to Wishlist    | PUT          | `/api/product/wishlist`|
| 4       | Rate Product       | PUT          | `/api/product/rating`  |
| 5       | Create Product     | POST         | `/api/product/`        |
| 6       | Update Product     | PUT          | `/api/product/:id`     |
| 7       | Delete Product     | DELETE       | `/api/product/:id`     |

### Upload Images

| Sr. No. | Description            | Request Type | Endpoint                       |
|---------|------------------------|--------------|--------------------------------|
| 1       | Delete Uploaded Image  | DELETE       | `/api/upload/delete-img/:id`  |


## List of ENVs
* MONGODB_URI
* JWT_SECRET
* SMTP_HOST
* SMTP_EMAIL
* SMTP_PASSWORD

## GitHub Repo
<a href="https://github.com/thatbackendguy/swiftcart-backend"><img src="https://opengraph.githubassets.com/c1a49735c0320cfcf735c4db8c4742f5e21db4fd2b1f5578fee451ea74454dce/thatbackendguy/swiftcart-backend" width="50%"/></a>
