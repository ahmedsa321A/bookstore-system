const db = require('../config/db');
const util = require('util');

const query = util.promisify(db.query).bind(db);
exports.checkout = (req, res) => {
    const userId = req.user.id;
    const { cardNumber, cartItems } = req.body;

    if (!cardNumber || cardNumber.length !== 16) {
        return res.status(400).json("Invalid Credit Card Number! Must be 16 digits.");
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json("Cart is empty or invalid!");
    }

    db.beginTransaction((err) => {
        if (err) return res.status(500).json(err);

        // 1. Fetch book details for all items to validate price and stock
        // We'll query all relevant books at once
        const isbnList = cartItems.map(item => item.isbn);
        if (isbnList.length === 0) {
            return db.rollback(() => res.status(400).json("No items to process."));
        }

        const placeholders = isbnList.map(() => '?').join(',');
        const booksQuery = `SELECT isbn, price, stock FROM books WHERE isbn IN (${placeholders})`;

        db.query(booksQuery, isbnList, (err, books) => {
            if (err) return db.rollback(() => res.status(500).json(err));

            // Create a lookup map for books
            const booksMap = {};
            books.forEach(b => booksMap[b.isbn] = b);

            let totalPrice = 0;
            const validOrderItems = [];

            // 2. Validate stock and calculate total
            for (const item of cartItems) {
                const book = booksMap[item.isbn];
                if (!book) {
                    return db.rollback(() => res.status(404).json(`Book with ISBN ${item.isbn} not found.`));
                }
                if (item.quantity <= 0) {
                    return db.rollback(() => res.status(400).json(`Invalid quantity for book ISBN: ${item.isbn}`));
                }

                if (book.stock < item.quantity) {
                    return db.rollback(() => res.status(400).json(`Not enough stock for book ISBN: ${item.isbn}`));
                }

                totalPrice += book.price * item.quantity;
                validOrderItems.push({
                    isbn: item.isbn,
                    quantity: item.quantity,
                    price: book.price
                });
            }

            // 3. Create Order
            const orderQuery = "INSERT INTO customer_orders (`customer_id`, `order_date`, `total_price`) VALUES (?, NOW(), ?)";

            db.query(orderQuery, [userId, totalPrice], (err, orderResult) => {
                if (err) return db.rollback(() => res.status(500).json(err));

                const orderId = orderResult.insertId;
                let processedCount = 0;

                // 4. Insert Order Items and Update Stock
                // Note: Could optimize this with a bulk insert, but sticking to existing pattern for simplicity/safety first
                validOrderItems.forEach((item) => {
                    const itemQuery = "INSERT INTO order_items (`order_id`, `isbn`, `quantity`, `price`) VALUES (?, ?, ?, ?)";

                    db.query(itemQuery, [orderId, item.isbn, item.quantity, item.price], (err) => {
                        if (err) return db.rollback(() => res.status(500).json(err));

                        const stockQuery = "UPDATE books SET stock = stock - ? WHERE isbn = ?";

                        db.query(stockQuery, [item.quantity, item.isbn], (err) => {
                            if (err) return db.rollback(() => res.status(500).json(err));

                            processedCount++;

                            if (processedCount === validOrderItems.length) {
                                db.commit((err) => {
                                    if (err) return db.rollback(() => res.status(500).json(err));
                                    return res.status(200).json("Order placed successfully! Transaction Complete.");
                                });
                            }
                        });
                    });
                });
            });
        });
    });
};

exports.getCustomerOrderHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const sql = `
            SELECT 
                co.order_id, 
                co.order_date, 
                co.total_price,
                oi.isbn, 
                oi.quantity, 
                oi.price AS unit_price,
                b.title, 
                b.image,
                p.Name as publisher,
                GROUP_CONCAT(a.Name SEPARATOR ', ') as authors
            FROM customer_orders co
            JOIN order_items oi ON co.order_id = oi.order_id
            JOIN books b ON oi.isbn = b.isbn
            LEFT JOIN Publishers p ON b.publisher_id = p.publisher_id
            LEFT JOIN BookAuthors ba ON b.isbn = ba.isbn
            LEFT JOIN Authors a ON ba.author_id = a.author_id
            WHERE co.customer_id = ?
            GROUP BY co.order_id, oi.isbn
            ORDER BY co.order_date DESC, co.order_id DESC
        `;

        const rows = await query(sql, [userId]);

        if (rows.length === 0) {
            return res.status(200).json([]);
        }


        const ordersMap = new Map();

        for (const row of rows) {
            if (!ordersMap.has(row.order_id)) {
                ordersMap.set(row.order_id, {
                    order_id: row.order_id,
                    order_date: row.order_date,
                    total_price: row.total_price,
                    items: []
                });
            }

            ordersMap.get(row.order_id).items.push({
                isbn: row.isbn,
                title: row.title,
                image: row.image,
                quantity: row.quantity,
                unit_price: row.unit_price,
                publisher: row.publisher || 'Unknown Publisher',
                authors: row.authors ? row.authors.split(', ') : ['Unknown Author']
            });
        }

        const formattedHistory = Array.from(ordersMap.values());

        return res.status(200).json(formattedHistory);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};