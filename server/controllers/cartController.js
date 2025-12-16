const db=require('../config/db');

exports.addToCart = (req, res) => {


    const checkQuery = "SELECT * FROM Cart WHERE UserID = ? AND BookID = ?";
    
    if (!req.user || !req.user.id) {
        return res.status(500).json("Error: User ID is missing. Token might be invalid.");
    }

    db.query(checkQuery, [req.user.id, req.body.bookId], (err, data) => {
        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (data.length > 0) {
            const updateQuery = "UPDATE Cart SET Quantity = Quantity + 1 WHERE UserID = ? AND BookID = ?";
            db.query(updateQuery, [req.user.id, req.body.bookId], (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Item quantity increased.");
            });
        } else {
            const insertQuery = "INSERT INTO Cart (`UserID`, `BookID`, `Quantity`) VALUES (?)";
            const values = [req.user.id, req.body.bookId, 1];

            db.query(insertQuery, [values], (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Item added to cart.");
            });
        }
    });
};

exports.getCart=(req,res)=>{
    const q = `
        SELECT Cart.CartID, Books.Title, Books.Price, Books.CoverImage, Cart.Quantity 
        FROM Cart 
        JOIN Books ON Cart.BookID = Books.BookID 
        WHERE Cart.UserID = ?
    `;
    db.query(q, [req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

exports.removeFromCart = (req, res) => {
    const q = "DELETE FROM Cart WHERE CartID = ? AND UserID = ?"; // Security: Check UserID too!

    db.query(q, [req.params.cartId, req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Item removed from cart.");
    });
};