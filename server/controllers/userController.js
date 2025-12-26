const db=require('../config/db');

const bcrypt=require('bcryptjs');


exports.getMe = (req, res) => {
    const myId = req.user.id; 

    const q = "SELECT * FROM Users WHERE User_id = ?";

    db.query(q, [myId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        
        const { Password, ...info } = data[0]; 
        return res.status(200).json(info);
    });
};

exports.getUser=(req,res)=>{
    if (req.user.id != req.params.id) {
        return res.status(403).json("You can only view your own profile!");
    }

    const q = "SELECT User_id, Username, Email, Address, Phone FROM Users WHERE User_id = ?";
    
    db.query(q, [req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        return res.status(200).json(data[0]);
    });
};

exports.updateUser = (req, res) => {
    if (req.user.id != req.params.id) {
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

    const checkQuery = "SELECT * FROM Users WHERE UserID = ?";

    db.query(checkQuery, [req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const currentUser = data[0];
        let finalPassword = currentUser.Password;

        // 🔐 Password logic
        if (current_password && current_password.trim() !== "") {
            const isMatch = bcrypt.compareSync(
                current_password,
                currentUser.Password
            );

            if (!isMatch) {
                return res.status(400).json("Current password is incorrect!");
            }

            if (!new_password || new_password.trim() === "") {
                return res.status(400).json("New password is required!");
            }

            const salt = bcrypt.genSaltSync(10);
            finalPassword = bcrypt.hashSync(new_password, salt);
        }

        // 📧 Email uniqueness check
        const emailToCheck = email || currentUser.Email;
        const emailCheckQuery =
            "SELECT UserID FROM Users WHERE Email = ? AND UserID != ?";

        db.query(emailCheckQuery, [emailToCheck, req.user.id], (err, emailData) => {
            if (err) return res.status(500).json(err);

            if (emailData.length > 0) {
                return res.status(400).json("Email already in use!");
            }

            const updateQuery = `
                UPDATE Users 
                SET 
                    FirstName = ?, 
                    LastName = ?, 
                    Email = ?, 
                    Password = ?, 
                    Address = ?, 
                    Phone = ?
                WHERE UserID = ?
            `;

            const values = [
                first_name || currentUser.FirstName,
                last_name || currentUser.LastName,
                emailToCheck,
                finalPassword,
                address || currentUser.Address,
                phone || currentUser.Phone,
                req.params.id
            ];

            db.query(updateQuery, values, (err) => {
                if (err) return res.status(400).json(err);

                const updatedUser = {
                    id: req.params.id,
                    first_name: first_name || currentUser.FirstName,
                    last_name: last_name || currentUser.LastName,
                    email: emailToCheck,
                    address: address || currentUser.Address,
                    phone: phone || currentUser.Phone,
                };

                return res.status(200).json({
                    message: "Profile updated successfully!",
                    user: updatedUser
                });
            });
        });
    });
};

