const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const { username, email, password, first_name, last_name, phone, address } = req.body;


    const checkQuery = `
        SELECT username FROM users WHERE username = ? 
        UNION 
        SELECT email FROM customers WHERE email = ?
    `;

    db.query(checkQuery, [username, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) return res.status(409).json("Username or Email already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const insertUserQuery = "INSERT INTO users (username, password, role) VALUES (?, ?, 'CUSTOMER')";
        
        db.query(insertUserQuery, [username, hash], (err, userResult) => {
            if (err) return res.status(500).json({ error: err.message });

            const newUserId = userResult.insertId;

            const insertCustomerQuery = "INSERT INTO customers (user_id, first_name, last_name, email, phone, address) VALUES (?)";
            const customerValues = [newUserId, first_name, last_name, email, phone, address];

            db.query(insertCustomerQuery, [customerValues], (err, customerResult) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to save profile details." });
                }
                return res.status(200).json("User registered successfully!");
            });
        });
    });
};

exports.login = (req, res) => {
    const q = `
        SELECT u.user_id, u.username, u.password, u.role, 
            c.first_name, c.last_name, c.email, c.phone, c.address 
        FROM users u 
        LEFT JOIN customers c ON u.user_id = c.user_id 
        WHERE u.username = ?
    `;

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].user_id, role: data[0].role }, process.env.JWT_SECRET, {
            expiresIn: "1d" // Expires in 1 day
        });

        const { password, ...otherInfo } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(otherInfo);
    });
};

exports.logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    });

    if (req.user && req.user.id) {
         const clearCartQ = "DELETE FROM cart WHERE user_id = ?";
         db.query(clearCartQ, [req.user.id]); 
    }

    return res.status(200).json("User has been logged out.");
};