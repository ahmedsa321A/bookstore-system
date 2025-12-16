const db = require('../config/db'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const { username, email, password, first_name, last_name, phone, address } = req.body;

    const checkQuery = "SELECT * FROM Users WHERE email = ? OR username = ?";

    db.query(checkQuery, [email, username], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length) return res.status(409).json("User already exists!");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const insertQuery = "INSERT INTO Users (Username, Email, Password, FirstName, LastName, Phone, Address) VALUES (?)";
        const values = [username, email, hash, first_name, last_name, phone, address];

        db.query(insertQuery, [values], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json("User created successfully!");
        });
    }); 
};

exports.login = (req, res) => {
    const q = "SELECT * FROM Users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].Password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].UserID, role: data[0].Role }, process.env.JWT_SECRET);

        const { Password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);
    });
};


exports.logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    });

    return res.status(200).json("User has been logged out.");
};