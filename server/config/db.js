// Example of a safe startup pattern
const mysql = require('mysql2');
const express = require('express');
const app = express();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: true } // Required for Azure MySQL
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        // We do NOT return here; we let the server start so we can see the logs
    } else {
        console.log('✅ Connected to Azure Database');
    }
});

// Start the server immediately so Azure sees we are alive
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});