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

    const {
        first_name,
        last_name,
        email,
        address,
        phone,
        current_password,
        new_password
    } = req.body;

    // 1. Fetch current data from BOTH tables
    const checkQuery = `
        SELECT u.password, c.first_name, c.last_name, c.email, c.phone, c.address 
        FROM users u
        LEFT JOIN customers c ON u.user_id = c.user_id
        WHERE u.user_id = ?
    `;

    db.query(checkQuery, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const currentUser = data[0];
        let finalPassword = currentUser.password; // Note: lowercase 'password' from database

        if (current_password && current_password.trim() !== "") {
            const isMatch = bcrypt.compareSync(current_password, currentUser.password);

            if (!isMatch) {
                return res.status(400).json("Current password is incorrect!");
            }

            if (!new_password || new_password.trim() === "") {
                return res.status(400).json("New password is required!");
            }

            const salt = bcrypt.genSaltSync(10);
            finalPassword = bcrypt.hashSync(new_password, salt);
        }

        const emailToCheck = email || currentUser.email;
        const emailCheckQuery = "SELECT user_id FROM customers WHERE email = ? AND user_id != ?";

        db.query(emailCheckQuery, [emailToCheck, id], (err, emailData) => {
            if (err) return res.status(500).json(err);
            if (emailData.length > 0) return res.status(400).json("Email already in use!");


            const userUpdateQuery = "UPDATE users SET password = ? WHERE user_id = ?";
            db.query(userUpdateQuery, [finalPassword, id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Error updating login credentials.");
                }

                // B. Update Details in 'customers' table
                const customerUpdateQuery = `
                    UPDATE customers 
                    SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ? 
                    WHERE user_id = ?
                `;

                const customerValues = [
                    first_name || currentUser.first_name,
                    last_name || currentUser.last_name,
                    emailToCheck,
                    phone || currentUser.phone,
                    address || currentUser.address,
                    id
                ];

                db.query(customerUpdateQuery, customerValues, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json("Error updating profile details.");
                    }

                    const updatedUser = {
                        user_id: parseInt(id),
                        first_name: first_name || currentUser.first_name,
                        last_name: last_name || currentUser.last_name,
                        email: emailToCheck,
                        address: address || currentUser.address,
                        phone: phone || currentUser.phone,
                        role: 'CUSTOMER' // Assuming role doesn't change here
                    };

                    return res.status(200).json({
                        message: "Profile updated successfully!",
                        user: updatedUser
                    });
                });
            });
        });
    });
};