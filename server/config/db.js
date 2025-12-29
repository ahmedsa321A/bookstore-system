const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'bookstore',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

module.exports = pool.promise();