const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getMe = (req, res) => {
    const myId = req.user.id; 

    const q = `
        SELECT u.user_id, u.username, u.role, 
               c.first_name, c.last_name, c.email, c.phone, c.address 
        FROM users u
        LEFT JOIN customers c ON u.user_id = c.user_id
        WHERE u.user_id = ?
    `;

    db.query(q, [myId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        
        return res.status(200).json(data[0]);
    });
};

exports.getUser = (req, res) => {
    if (req.user.id != req.params.id) {
        return res.status(403).json("You can only view your own profile!");
    }

    const q = `
        SELECT u.user_id, u.username, u.role, 
               c.first_name, c.last_name, c.email, c.phone, c.address 
        FROM users u
        LEFT JOIN customers c ON u.user_id = c.user_id
        WHERE u.user_id = ?
    `;
    
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        return res.status(200).json(data[0]);
    });
};

exports.updateUser = (req, res) => {
    const id = req.params.id;

    if (req.user.id != id) {
        return res.status(403).json("You can only update your own profile!");
    }

    const checkQuery = `
        SELECT u.username, u.password, 
               c.first_name, c.last_name, c.email, c.phone, c.address 
        FROM users u
        LEFT JOIN customers c ON u.user_id = c.user_id
        WHERE u.user_id = ?
    `;

    db.query(checkQuery, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const currentUser = data[0];

        let finalPassword = currentUser.password;
        if (req.body.password && req.body.password.trim() !== "") {
            const salt = bcrypt.genSaltSync(10);
            finalPassword = bcrypt.hashSync(req.body.password, salt);
        }

        const userUpdateQuery = "UPDATE users SET username=?, password=? WHERE user_id=?";
        const userValues = [
            req.body.username || currentUser.username, 
            finalPassword, 
            id
        ];

        db.query(userUpdateQuery, userValues, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json("Error updating login credentials.");
            }

            const customerUpdateQuery = "UPDATE customers SET first_name=?, last_name=?, email=?, phone=?, address=? WHERE user_id=?";
            
            const customerValues = [
                req.body.first_name || currentUser.first_name,
                req.body.last_name  || currentUser.last_name,
                req.body.email      || currentUser.email,
                req.body.phone      || currentUser.phone,
                req.body.address    || currentUser.address,
                id
            ];

            db.query(customerUpdateQuery, customerValues, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Error updating profile details.");
                }
                return res.status(200).json("Profile updated successfully!");
            });
        });
    });
};