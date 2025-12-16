# update-1 
1. Base URL: http://localhost:8800/api/auth

2. Endpoints:

Signup: POST /signup

Body: { username, email, password, first_name, last_name, phone, address }

Login: POST /login

Body: { username, password }

Response: Returns user info (id, name, role) but NO token string.

Logout: POST /logout

Body: Empty {}

CRITICAL FOR REACT (The Cookie Part): I am storing the JWT token in an HTTP-Only Cookie for security (not LocalStorage).

You cannot read the token in your JavaScript code. It's hidden from the browser.

You MUST enable credentials: When you make requests (using Axios or Fetch), you must add this setting, otherwise the browser will ignore the cookie:

```JavaScript
// If using Axios:
axios.post(url, data, { withCredentials: true })
```
update-2
very request to the cart MUST include the withCredentials: true setting (just like you did for auth), or the server will reject it.

Here are the Endpoints:

1. Add to Cart

URL: POST http://localhost:8800/api/cart/add

Body: { "bookId": 50 }

Note: It automatically checks the logged-in user's token.

2. Get Cart Items

URL: GET http://localhost:8800/api/cart

Response: Returns an array of items.

IMPORTANT: Each item has a CartID. You need to save this ID to use for the delete button.

JSON
```
[ { "CartID": 14, "Title": "The Great Gatsby", ... } ]
```
3. Remove Item

URL: DELETE http://localhost:8800/api/cart/:id

Example: /api/cart/14 (Use the CartID, NOT the BookID!)

# update-3

1. Home Page (Public)

URL: GET http://localhost:8800/books

Use: Fetch this to display all available books on the landing page.

2. Get User Details (For "Edit Profile" Form)

URL: GET http://localhost:8800/api/users/:id

Replace :id with the UserID you saved during login.

Use: Pre-fill the form inputs (Name, Email, Address, etc.).

Note: This does not return the password (for security).

3. Update User Profile

URL: PUT http://localhost:8800/api/users/:id

Body: Send the fields you want to update.

```JSON

{
  "username": "New Name",
  "email": "new@email.com",
  "password": "",  // LEAVE EMPTY to keep the old password
  "address": "New Address",
  "phone": "0123456789"
}
```


getME
URL: PUT http://localhost:8800/api/users/me
