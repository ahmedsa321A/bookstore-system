const db = require('../config/db');

exports.checkout = (req, res) => {
    const userId = req.user.id; 
    const { cardNumber } = req.body;

    if (!cardNumber || cardNumber.length !== 16) {
        return res.status(400).json("Invalid Credit Card Number! Must be 16 digits.");
    }

    db.beginTransaction((err) => {
        if (err) return res.status(500).json(err);

        const cartQuery = `
            SELECT c.cart_id, c.quantity, b.isbn, b.price, b.stock 
            FROM cart c 
            JOIN books b ON c.isbn = b.isbn 
            WHERE c.user_id = ?
        `;

        db.query(cartQuery, [userId], (err, cartItems) => {
            if (err) return db.rollback(() => res.status(500).json(err));
            if (cartItems.length === 0) return db.rollback(() => res.status(400).json("Cart is empty!"));

            let totalPrice = 0;
            for (const item of cartItems) {
                if (item.stock < item.quantity) {
                    return db.rollback(() => res.status(400).json(`Not enough stock for book ISBN: ${item.isbn}`));
                }
                totalPrice += item.price * item.quantity;
            }

            const orderQuery = "INSERT INTO customer_orders (`customer_id`, `order_date`, `total_price`) VALUES (?, NOW(), ?)";

            db.query(orderQuery, [userId, totalPrice], (err, orderResult) => {
                if (err) return db.rollback(() => res.status(500).json(err));

                const orderId = orderResult.insertId;

                let processedCount = 0;

                cartItems.forEach((item) => {
                    const itemQuery = "INSERT INTO order_items (`order_id`, `isbn`, `quantity`, `price`) VALUES (?, ?, ?, ?)";
                    
                    db.query(itemQuery, [orderId, item.isbn, item.quantity, item.price], (err) => {
                        if (err) return db.rollback(() => res.status(500).json(err));

                        const stockQuery = "UPDATE books SET stock = stock - ? WHERE isbn = ?";
                        
                        db.query(stockQuery, [item.quantity, item.isbn], (err) => {
                            if (err) return db.rollback(() => res.status(500).json(err));

                            processedCount++;

                            if (processedCount === cartItems.length) {
                                
                                const clearCartQuery = "DELETE FROM cart WHERE user_id = ?";
                                db.query(clearCartQuery, [userId], (err) => {
                                    if (err) return db.rollback(() => res.status(500).json(err));

                                    db.commit((err) => {
                                        if (err) return db.rollback(() => res.status(500).json(err));
                                        return res.status(200).json("Order placed successfully! Transaction Complete.");
                                    });
                                });
                            }
                        });
                    });
                });
            });
        });
    });
};