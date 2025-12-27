const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { username, email, password, first_name, last_name, phone, address } = req.body;

        const checkQuery = `
            SELECT username FROM users WHERE username = ? 
            UNION 
            SELECT email FROM customers WHERE email = ?
        `;

        const [existingUsers] = await db.query(checkQuery, [username, email]);

        if (existingUsers.length > 0) {
            return res.status(409).json("Username or Email already exists!");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const insertUserQuery = "INSERT INTO users (username, password, role) VALUES (?, ?, 'CUSTOMER')";
        const [userResult] = await db.query(insertUserQuery, [username, hash]);

        const newUserId = userResult.insertId;

        const insertCustomerQuery = "INSERT INTO customers (user_id, first_name, last_name, email, phone, address) VALUES (?)";
        const customerValues = [newUserId, first_name, last_name, email, phone, address];

        await db.query(insertCustomerQuery, [customerValues]);

        return res.status(200).json("User registered successfully!");
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const q = `
            SELECT u.user_id, u.username, u.password, u.role, 
                c.first_name, c.last_name, c.email, c.phone, c.address 
            FROM users u 
            LEFT JOIN customers c ON u.user_id = c.user_id 
            WHERE u.username = ?
        `;

        const [data] = await db.query(q, [req.body.username]);

        if (data.length === 0) return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].user_id, role: data[0].role }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        const { password, ...otherInfo } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(otherInfo);
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    });

    return res.status(200).json("User has been logged out.");
};