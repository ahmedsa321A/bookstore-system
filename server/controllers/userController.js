const db=require('../config/db');

const bcrypt=require('bcryptjs');

exports.getUser=(req,res)=>{
    if (req.user.id != req.params.id) {
        return res.status(403).json("You can only view your own profile!");
    }

    const q = "SELECT UserID, Username, Email, Address, Phone FROM Users WHERE UserID = ?";
    
    db.query(q, [req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        return res.status(200).json(data[0]);
    });
};

exports.updateUser=(req,res)=>{
    if (req.user.id != req.params.id) {
        return res.status(403).json("You can only update your own profile!");
    }

    const checkQuery = "SELECT * FROM Users WHERE UserID = ?";

    db.query(checkQuery, [req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const currentUser=data[0];

        let finalPassword = currentUser.Password;

        if (req.body.password && req.body.password.trim() !== "") {
            const salt = bcrypt.genSaltSync(10);
            finalPassword = bcrypt.hashSync(req.body.password, salt);
        }

        const updateQuery = "UPDATE Users SET `Username`=?, `Email`=?, `Password`=?, `Address`=?, `Phone`=? WHERE UserID=?";

        const values = [
            req.body.username || currentUser.Username, 
            req.body.email || currentUser.Email,
            finalPassword,
            req.body.address || currentUser.Address,
            req.body.phone || currentUser.Phone,
            req.params.id
        ];

        db.query(updateQuery, values, (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Profile updated successfully!");
        });
    });
};