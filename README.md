# Online Bookstore System

> A comprehensive full-stack e-commerce platform for browsing, purchasing, and managing books, featuring a modern React frontend, a robust Node.js backend, and a Python-based recommendation engine.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

## 📖 Project Overview

The **Online Bookstore System** is designed to simulate a real-world e-commerce environment. It facilitates seamless interaction between **Customers** (who browse and buy books) and **Administrators** (who manage inventory and orders). The system ensures data integrity with MySQL transactions, provides real-time stock management with automated triggers, and offers personalized book recommendations.

## ✨ Features

### 🛍️ Customer Module
*   **Book Catalog**: Browse a wide range of books with advanced filtering (Category, Author, Price).
*   **Search**: Real-time search by title, author, or ISBN.
*   **Shopping Cart**: Manage items locally before checkout.
*   **Secure Checkout**: Atomic transactions ensure stock is reserved and orders are processed securely.
*   **Order History**: View past purchases and status.

### 🛡️ Admin Module
*   **Inventory Management**: Add, update, or remove books and authors.
*   **Smart Procurement**:
    *   **Auto-Stock Triggers**: Automatically generates publisher orders when stock falls below a threshold.
    *   **Negative Stock Protection**: Database triggers prevent invalid stock updates.
*   **Publisher Management**: Manage publisher relationships and orders.
*   **Analytics Dashboard**: View sales data, top customers, and best-selling books.


### 🤖 Machine Learning Service
<!-- *   **Content-Based Recommendations**: Suggests books based on similarity (TF-IDF analysis of Title, Category, and Authors).
*   **Python/Flask API**: A dedicated microservice handling recommendation logic. -->
*   **COMING SOON**

## 🛠️ Tech Stack

*   **Frontend**: React.js (Vite), TailwindCSS, Redux Toolkit
*   **Backend**: Node.js, Express.js
*   **Database**: MySQL (Relational Schema, Triggers, ACID Transactions)
*   **ML Service**: Python, Flask, Scikit-learn, Pandas

---

## 🚀 Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
*   **Node.js** (v18+)
*   **Python** (v3.8+)
*   **MySQL Server**

### 1. Database Setup
1.  Open your MySQL client (Workbench, CLI, etc.).
2.  Create a database named `bookstore`.
3.  Import the schema and data:
    ```sql
    source database/BookstoreDB.sql
    ```
    *This script creates the tables, triggers (`prevent_negative_stock`, `auto_reorder_books`), and seeds initial data.*

### 2. Backend Server
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` root with your database credentials:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_password
    DB_NAME=bookstore
    PORT=8800
    JWT_SECRET=your_secret_key
    ```
4.  Start the server:
    ```bash
    npm start
    ```
    *Server runs on `http://localhost:8800`*

### 3. Frontend Client
1.  Navigate to the client directory:
    ```bash
    cd client/book_store
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *Client runs on `http://localhost:5173`*

### 4. Recommendation Service (Optional)
1.  Navigate to the ML service directory:
    ```bash
    cd server/ml_service
    ```
2.  Install Python requirements:
    ```bash
    pip install -r requirements.txt
    ```
3.  Start the Flask app:
    ```bash
    python app.py
    ```
    *Service runs on `http://localhost:5000`*

## 📚 API Documentation

For detailed API endpoints, request/response formats, and authentication details, please refer to the [API Reference](API_REFERENCE.md).

## 👥 Team Members

*   **Hazem Barakat** - Frontend Lead
*   **Ahmed Saied** - Backend Engineer
*   **Adham Zakaria** - Backend Engineer (Admin & Reports)
*   **Begad Mohamed** - Database Architect

---

*Verified for Database Systems Course (Fall 2025) - Alexandria University*
