const db = require('../config/db');

exports.placePublisherOrder = async (req, res) => {
    try {
        const { isbn } = req.body;
        const CONSTANT_QTY = 50;

        // 1. Get Book Details
        const [bookCheck] = await db.query("SELECT publisher_id, Title, Stock, Threshold FROM Books WHERE ISBN = ?", [isbn]);

        if (bookCheck.length === 0) {
            return res.status(404).json("Book not found.");
        }

        const book = bookCheck[0];

        // 2. Logic Check A: Is Stock < Threshold?
        if (book.Stock >= book.Threshold) {
            return res.status(400).json({
                error: "Operation Cancelled: Stock is sufficient.",
                details: `Current Stock (${book.Stock}) is not below the Threshold (${book.Threshold}).`
            });
        }

        // =========================================================
        // 3. LOGIC CHECK B: Is there already a PENDING order for this book?
        // =========================================================
        // We join order_items with orders to check if this ISBN exists in any 'Pending' order
        const [duplicateCheck] = await db.query(`
            SELECT po.publisher_order_id 
            FROM publisher_orders po
            JOIN publisher_order_items poi ON po.publisher_order_id = poi.publisher_order_id
            WHERE poi.isbn = ? AND po.status = 'Pending'
        `, [isbn]);

        if (duplicateCheck.length > 0) {
            return res.status(409).json({
                error: "Duplicate Order Detected.",
                details: `A pending order (ID: ${duplicateCheck[0].publisher_order_id}) already exists for this book. Please confirm or cancel it first.`
            });
        }

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            // 4. Create Order Header
            const [orderResult] = await connection.query(
                "INSERT INTO publisher_orders (publisher_id, order_date, status) VALUES (?, NOW(), 'Pending')",
                [book.publisher_id]
            );

            const orderId = orderResult.insertId;

            // 5. Create Order Item
            await connection.query(
                "INSERT INTO publisher_order_items (publisher_order_id, isbn, quantity) VALUES (?, ?, ?)",
                [orderId, isbn, CONSTANT_QTY]
            );

            await connection.commit();
            return res.status(201).json({
                message: "Order placed successfully.",
                orderId: orderId,
                quantityOrdered: CONSTANT_QTY
            });

        } catch (innerErr) {
            await connection.rollback();
            throw innerErr;
        } finally {
            connection.release();
        }

    } catch (err) {
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

        const [rows] = await db.query(sql);

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

        const [orderCheck] = await db.query("SELECT status FROM publisher_orders WHERE publisher_order_id = ?", [orderId]);
        if (orderCheck.length === 0) return res.status(404).json("Order not found.");

        if (orderCheck[0].status !== 'Pending') {
            return res.status(400).json(`Cannot confirm order. Current status is ${orderCheck[0].status}.`);
        }

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const [items] = await connection.query("SELECT isbn, quantity FROM publisher_order_items WHERE publisher_order_id = ?", [orderId]);

            for (const item of items) {
                await connection.query("UPDATE Books SET Stock = Stock + ? WHERE ISBN = ?", [item.quantity, item.isbn]);
            }

            await connection.query("UPDATE publisher_orders SET status = 'Confirmed' WHERE publisher_order_id = ?", [orderId]);

            await connection.commit();
            return res.status(200).json("Order confirmed and stock updated.");

        } catch (innerErr) {
            await connection.rollback();
            throw innerErr;
        } finally {
            connection.release();
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.cancelPublisherOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const [orderCheck] = await db.query("SELECT status FROM publisher_orders WHERE publisher_order_id = ?", [orderId]);
        if (orderCheck.length === 0) return res.status(404).json("Order not found.");

        if (orderCheck[0].status !== 'Pending') {
            return res.status(400).json(`Cannot cancel order. Current status is ${orderCheck[0].status}.`);
        }

        await db.query("UPDATE publisher_orders SET status = 'Cancelled' WHERE publisher_order_id = ?", [orderId]);

        return res.status(200).json("Order cancelled successfully.");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};