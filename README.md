# Food Restaurant Delivery App Backend

This is a Node.js backend for a food delivery application. It provides RESTful APIs for user authentication, restaurant and food management, cart, order, and payment processing.

---

## Features

- **User Authentication:** Register, login, logout, JWT-based authentication, password change, profile update.
- **Restaurant Management:** Register, update, fetch details, manage menu, and reviews.
- **Food Management:** Add, update, delete, and fetch food items.
- **Cart Management:** Add, update, delete items in cart, view cart.
- **Order Management:** Create order from cart, view orders, cancel order.
- **Payment Integration:** Razorpay integration for payments and payment verification.
- **Email Notifications:** Email on registration, order cancellation, and payment confirmation.
- **File Uploads:** Avatar, cover images, and food images using Multer and Cloudinary.
- **MongoDB Database:** Mongoose models for all entities.

---

## Tech Stack

- **Node.js** (Express)
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **Razorpay** for payments
- **Cloudinary** for image storage
- **Multer** for file uploads
- **Nodemailer** for emails

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd food_restaurent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=food_restaurant
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password
MAIL_FROM=your_email@example.com
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CORS_ORIGIN=http://localhost:3000
```

### 4. Start the Server

```bash
npm run dev
```

---

## API Endpoints

### User

- `POST /api/v1/users/register` — Register user (with avatar & cover image)
- `POST /api/v1/users/login` — Login
- `POST /api/v1/users/logout` — Logout
- `POST /api/v1/users/refresh-token` — Refresh JWT
- `POST /api/v1/users/change-password` — Change password
- `GET /api/v1/users/me` — Get user details
- `PUT /api/v1/users/update-account` — Update account details
- `PUT /api/v1/users/update-avatar` — Update avatar
- `PUT /api/v1/users/update-cover` — Update cover image
- `GET /api/v1/users/orders` — Get user orders

### Restaurant

- `POST /api/v1/restaurants/registerrestro` — Register restaurant (with cover image)
- `PUT /api/v1/restaurants/updaterestro/:restaurentid` — Update restaurant
- `GET /api/v1/restaurants/getrestrodetails/:restaurentid` — Get details
- `GET /api/v1/restaurants/getallreviews/:restaurentid` — Get reviews
- `GET /api/v1/restaurants/getmenu/:restaurentid` — Get menu

### Food

- `POST /api/v1/food/create` — Add food item (with image)
- `PUT /api/v1/food/update/:id` — Update food item
- `GET /api/v1/food/by-restaurant/:id` — Get food by restaurant
- `GET /api/v1/food/by-id/:foodid` — Get food by ID
- `DELETE /api/v1/food/delete/:foodid` — Delete food

### Cart

- `POST /api/v1/cart/add` — Add item to cart
- `DELETE /api/v1/cart/item/:foodid` — Remove item
- `PUT /api/v1/cart/item/:foodid` — Update quantity
- `GET /api/v1/cart/` — Get user cart

### Order

- `POST /api/v1/order/create-from-cart` — Create order from cart
- `GET /api/v1/order/my-orders` — Get user orders
- `GET /api/v1/order/:orderid` — Get order by ID
- `PUT /api/v1/order/:orderid/cancel` — Cancel order

### Payment

- `POST /api/v1/payment/create` — Create payment order (Razorpay)
- `POST /api/v1/payment/verify` — Verify payment

---

## Folder Structure

```
src/
  app.js
  index.js
  controllers/
  db/
  middlewares/
  models/
  routes/
  service/
  utils/
public/
```

---

## Testing

You can add unit and integration tests using [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest).

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)
