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
