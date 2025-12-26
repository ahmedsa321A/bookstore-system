
# Bookstore System API Documentation

**Base URL**: `http://localhost:8800`

## Important Notes for Frontend
1.  **Credentials**: All requests requiring authentication MUST include `{ withCredentials: true }` (axios) or `credentials: 'include'` (fetch) to send the HTTP-Only cookie.
2.  **Tokens**: The JWT is stored in an HTTP-Only cookie named `access_token`. You cannot access it via JavaScript.

---

## 1. Authentication (`/api/auth`)

### Signup
*   **URL**: `POST /api/auth/signup`
*   **Body**:
    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "password123",
      "first_name": "John",
      "last_name": "Doe",
      "phone": "1234567890",
      "address": "123 Main St"
    }
    ```
*   **Response**: `200 OK` - "User registered successfully!"

### Login
*   **URL**: `POST /api/auth/login`
*   **Body**:
    ```json
    {
      "username": "john_doe",
      "password": "password123"
    }
    ```
*   **Response**: `200 OK` - Returns user profile object (excluding password). Sets `access_token` cookie.

### Logout
*   **URL**: `POST /api/auth/logout`
*   **Body**: `{}`
*   **Response**: `200 OK` - Clears cookie.

---

## 2. Users (`/api/users`)

### Get Current User
*   **URL**: `GET /api/users/me`
*   **Auth**: User Token
*   **Response**: `200 OK` - User profile object.

### Get User Profile
*   **URL**: `GET /api/users/:id`
*   **Auth**: User Token (Own profile only)
*   **Response**: `200 OK` - User profile object.

### Update User Profile
*   **URL**: `PUT /api/users/:id`
*   **Auth**: User Token (Own profile only)
*   **Body** (Send only fields to update):
    ```json
    {
      "username": "new_name",
      "email": "new@email.com",
      "password": "newpassword"
    }
    ```
*   **Response**: `200 OK` - "Profile updated successfully!"

---

## 3. Books (`/api/books`)

### Search / List Books (Public)
*   **URL**: `GET /api/books` or `GET /api/books/search`
*   **Query Params** (Optional): `?isbn=...&title=...&category=...&author=...&publisher=...`
*   **Response**: `200 OK` - Array of book objects.

### Add Book (Admin Only)
*   **URL**: `POST /api/books/add`
*   **Auth**: Admin Token
*   **Body**:
    ```json
    {
      "isbn": "9781234567897",
      "title": "New Book",
      "publication_year": 2024,
      "price": 29.99,
      "stock": 100,
      "threshold": 10,
      "threshold": 10,
      "publisher_id": 1,
      "category": "Science",
      "author": ["Author One", "Author Two"],
      "image": "https://example.com/image.jpg"
    }
    ```
*   **Response**: `201 Created` - "Book added successfully!"

### Update Book (Admin Only)
*   **URL**: `PUT /api/books/update/:isbn`
*   **Auth**: Admin Token
*   **Body**:
    ```json
    {
      "price": 35.50,
      "price": 35.50,
      "stock": 50,
      "image": "https://example.com/new-image.jpg"
    }
    ```
*   **Response**: `200 OK` - "Book modified successfully!"

### Delete Book (Admin Only)
*   **URL**: `DELETE /api/books/delete/:isbn`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - "Book deleted successfully!"

### Add Author (Admin Only)
*   **URL**: `POST /api/books/addAuthor`
*   **Auth**: Admin Token
*   **Body**:
    ```json
    {
      "name": "J.K. Rowling"
    }
    ```
*   **Response**: `201 Created` - "Author added successfully!"

### Add Publisher (Admin Only)
*   **URL**: `POST /api/books/addPublisher`
*   **Auth**: Admin Token
*   **Body**:
    ```json
    {
      "name": "Penguin Random House",
      "address": "123 Publisher Lane",
      "phone": "555-0199"
    }
    ```
*   **Response**: `201 Created` - "Publisher added successfully!"

---

## 4. Orders (`/api/orders`)

### Checkout
*   **URL**: `POST /api/orders/checkout`
*   **Auth**: User Token
*   **Body**:
    ```json
    {
      "cardNumber": "1234567812345678",
      "cartItems": [
        { "isbn": "9781234567897", "quantity": 1 },
        { "isbn": "9780000000001", "quantity": 2 }
      ]
    }
    ```
*   **Response**: `200 OK` - "Order placed successfully! Transaction Complete."

### Get Order History
*   **URL**: `GET /api/orders/getCustomerOrderHistory`
*   **Auth**: User Token
*   **Response**: `200 OK` - Array of past orders with details.

---

## 5. Publisher Management (Admin Only)

### Get All Publishers
*   **URL**: `GET /api/books/publishers`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - JSON array of all publishers.

### Get Publisher Orders
*   **URL**: `GET /api/books/publisher/orders`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - JSON array of all publisher orders with items.

### Confirm Publisher Order
*   **URL**: `PUT /api/books/publisher/order/confirm/:orderId`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - "Order confirmed and stock updated."

### Cancel Publisher Order
*   **URL**: `PUT /api/books/publisher/order/cancel/:orderId`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - "Order cancelled successfully."

### Place Publisher Order
*   **URL**: `PUT /api/books/publisher/order`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - "Order cancelled successfully."
*   **body**
```
JSON
{
  "isbn": "9780132350881"
}
```

---

## 6. System Reports (Admin Only)

### Get Sales Last Month
*   **URL**: `GET /api/admin/sales/last-month`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - Object containing period and total sales.

### Get Sales by Date
*   **URL**: `GET /api/admin/sales/date`
*   **Auth**: Admin Token
*   **Query Param**: `?date=YYYY-MM-DD`
*   **Response**: `200 OK` - Object containing date and total sales.

### Get Top 5 Customers
*   **URL**: `GET /api/admin/top-customers`
*   **Auth**: Admin Token
*   **Description**: Top 5 customers by spending in the last 3 months.
*   **Response**: `200 OK` - JSON array of customers with total spent.

### Get Top 10 Selling Books
*   **URL**: `GET /api/admin/top-books`
*   **Auth**: Admin Token
*   **Description**: Top 10 books by quantity sold in the last 3 months.
*   **Response**: `200 OK` - JSON array of books with total copies sold.

### Get Replenishment Stats
*   **URL**: `GET /api/admin/replenishment/:isbn`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - Object showing times ordered and total quantity received from publishers.

