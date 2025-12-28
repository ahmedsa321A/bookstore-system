# Online Bookstore System

> A comprehensive full-stack e-commerce platform for browsing, purchasing, and managing books, built with a modern React frontend and a robust Node.js backend.

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://bookstore-eight-beige.vercel.app)
![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

## 🌐 Live Demo
**[https://bookstore-eight-beige.vercel.app](https://bookstore-eight-beige.vercel.app)**

## 📖 Project Overview

The **Online Bookstore System** is designed to simulate a real-world e-commerce environment. It facilitates seamless interaction between **Customers** (who browse and buy books) and **Administrators** (who manage inventory and orders). The system ensures data integrity with MySQL transactions, provides real-time stock management with automated triggers, and offers a smooth user experience.

## ✨ Features

### 🛍️ Customer Module
*   **Book Catalog**: Browse a wide range of books with advanced filtering (Category, Author, Price).
*   **Search**: Real-time search by title or ISBN with dynamic pagination.
*   **Shopping Cart**: Manage items locally before checkout.
*   **Secure Checkout**: Atomic transactions ensure stock is reserved and orders are processed securely with credit card validation.
*   **Order History**: View past purchases and status.
*   **User Profile**: Manage personal details and shipping address.

### 🛡️ Admin Module
*   **Inventory Management**: Add, update, or remove books and authors using Unsplash for cover images.
*   **Smart Procurement**:
    *   **Auto-Stock Triggers**: Automatically generates publisher orders when stock falls below a threshold.
    *   **Negative Stock Protection**: Database triggers prevent invalid stock updates.
*   **Publisher Management**: Manage publisher relationships and orders.
*   **Analytics Dashboard**: View sales data, top customers, and best-selling books.

## 🛠️ Tech Stack

*   **Frontend**: React.js (Vite), TypeScript, TailwindCSS, Redux Toolkit, React Query
*   **Backend**: Node.js, Express.js
*   **Database**: MySQL (Relational Schema, Triggers, ACID Transactions)
*   **Deployment**: Vercel (Frontend), Azure App Service (Backend), Azure Database for MySQL

---

## 🚀 Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
*   **Node.js** (v18+)
*   **MySQL Server**

### 1. Database Setup
1.  Open your MySQL client (Workbench, CLI, etc.).
2.  Create a database named `bookstore`.
3.  Import the schema and seed data.

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

## 📚 API Documentation

For detailed API endpoints, request/response formats, and authentication details, please refer to the [API Reference](API_REFERENCE.md).

## 👥 Team Members

*   **Hazem Barakat** - Frontend Lead
*   **Ahmed Saied** - Backend Engineer
*   **Adham Zakaria** - Backend Engineer (Admin & Reports)
*   **Begad Mohamed** - Database Architect

---

*Verified for Database Systems Course (Fall 2025) - Alexandria University*
