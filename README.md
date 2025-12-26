
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
      "publisher_id": 1,
      "category": "Science"
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
      "stock": 50
    }
    ```
*   **Response**: `200 OK` - "Book modified successfully!"

### Delete Book (Admin Only)
*   **URL**: `DELETE /api/books/delete/:isbn`
*   **Auth**: Admin Token
*   **Response**: `200 OK` - "Book deleted successfully!"

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

