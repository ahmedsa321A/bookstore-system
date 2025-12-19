const db = require('../config/db');

exports.addToCart = (req, res) => {
    const checkQuery = "SELECT * FROM cart WHERE user_id = ? AND isbn = ?";
    
    const bookIsbn = req.body.isbn || req.body.bookId; // Flexible check

    if (!req.user || !req.user.id) {
        return res.status(500).json("Error: User ID is missing. Token might be invalid.");
    }

    db.query(checkQuery, [req.user.id, bookIsbn], (err, data) => {
        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (data.length > 0) {
            const updateQuery = "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND isbn = ?";
            db.query(updateQuery, [req.user.id, bookIsbn], (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Item quantity increased.");
            });
        } else {
            const insertQuery = "INSERT INTO cart (`user_id`, `isbn`, `quantity`) VALUES (?)";
            const values = [req.user.id, bookIsbn, 1];

            db.query(insertQuery, [values], (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Item added to cart.");
            });
        }
    });
};

exports.getCart = (req, res) => {
    const q = `
        SELECT c.cart_id, b.title, b.price, b.cover_image, c.quantity, b.isbn 
        FROM cart c 
        JOIN books b ON c.isbn = b.isbn 
        WHERE c.user_id = ?
    `;
    db.query(q, [req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

exports.removeFromCart = (req, res) => {
    const q = "DELETE FROM cart WHERE cart_id = ? AND user_id = ?"; 

    db.query(q, [req.params.cartId, req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Item removed from cart.");
    });
};