const db = require('../config/db');
const util = require('util');

const query = util.promisify(db.query).bind(db);

exports.placePublisherOrder = async (req, res) => {
    try {
        const { isbn, quantity } = req.body;

        // Get book to find publisher
        const book = await query("SELECT publisher_id, Title FROM Books WHERE ISBN = ?", [isbn]);
        if (book.length === 0) return res.status(404).json("Book not found.");
        const publisherId = book[0].publisher_id;

        await query("START TRANSACTION");

        // Create Order
        const orderResult = await query("INSERT INTO publisher_orders (publisher_id, order_date, status) VALUES (?, NOW(), 'Pending')", [publisherId]);
        const orderId = orderResult.insertId;

        // Create Order Item
        await query("INSERT INTO publisher_order_items (publisher_order_id, isbn, quantity, price) VALUES (?, ?, ?, 0)", [orderId, isbn, quantity]);

        await query("COMMIT");
        return res.status(201).json("Order placed successfully.");
    } catch (err) {
        await query("ROLLBACK");
        return res.status(500).json({ error: err.message });
    }
};

exports.getPublisherOrders = async (req, res) => {
    try {
        const sql = `
            SELECT 
                po.publisher_order_id, 
                po.order_date, 
                po.status,
                p.name as publisher_name,
                poi.isbn, 
                poi.quantity,
                b.title
            FROM publisher_orders po
            JOIN publishers p ON po.publisher_id = p.publisher_id
            JOIN publisher_order_items poi ON po.publisher_order_id = poi.publisher_order_id
            JOIN books b ON poi.isbn = b.isbn
            ORDER BY po.publisher_order_id DESC
        `;

        const rows = await query(sql);

        const ordersMap = new Map();

        for (const row of rows) {
            if (!ordersMap.has(row.publisher_order_id)) {
                ordersMap.set(row.publisher_order_id, {
                    order_id: row.publisher_order_id,
                    publisher: row.publisher_name,
                    date: row.order_date,
                    status: row.status,
                    items: []
                });
            }
            ordersMap.get(row.publisher_order_id).items.push({
                isbn: row.isbn,
                title: row.title,
                quantity: row.quantity
            });
        }

        return res.status(200).json(Array.from(ordersMap.values()));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.confirmPublisherOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const orderCheck = await query("SELECT status FROM publisher_orders WHERE publisher_order_id = ?", [orderId]);
        if (orderCheck.length === 0) return res.status(404).json("Order not found.");

        if (orderCheck[0].status !== 'Pending') {
            return res.status(400).json(`Cannot confirm order. Current status is ${orderCheck[0].status}.`);
        }

        const items = await query("SELECT isbn, quantity FROM publisher_order_items WHERE publisher_order_id = ?", [orderId]);

        for (const item of items) {
            await query("UPDATE Books SET Stock = Stock + ? WHERE ISBN = ?", [item.quantity, item.isbn]);
        }

        await query("UPDATE publisher_orders SET status = 'Confirmed' WHERE publisher_order_id = ?", [orderId]);

        return res.status(200).json("Order confirmed and stock updated.");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.cancelPublisherOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const orderCheck = await query("SELECT status FROM publisher_orders WHERE publisher_order_id = ?", [orderId]);
        if (orderCheck.length === 0) return res.status(404).json("Order not found.");

        if (orderCheck[0].status !== 'Pending') {
            return res.status(400).json(`Cannot cancel order. Current status is ${orderCheck[0].status}.`);
        }

        await query("UPDATE publisher_orders SET status = 'Cancelled' WHERE publisher_order_id = ?", [orderId]);

        return res.status(200).json("Order cancelled successfully.");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};