const db = require('../config/db');
const util = require('util');

const query = util.promisify(db.query).bind(db);

exports.getAllCustomerOrders = async (req, res) => {
    try {
        // Fetch all orders with customer details
        const ordersQuery = `
            SELECT 
                co.order_id, 
                co.customer_id, 
                co.order_date, 
                co.total_price, 
                co.status,
                c.first_name,
                c.last_name,
                c.email,
                c.address as shipping_address
            FROM customer_orders co
            JOIN Customers c ON co.customer_id = c.customer_id
            ORDER BY co.order_date DESC
        `;
        const orders = await query(ordersQuery);

        // Fetch items for each order
        // Optimization: Could be done with a single large join, but map is cleaner for structure sometimes. 
        // Given typically admin page pagination, a loop or 'IN' query is fine.
        // Let's do a separate query using IN for efficiency if orders exist.

        if (orders.length === 0) {
            return res.status(200).json([]);
        }

        const validOrders = orders.map(o => ({
            ...o,
            customer_name: `${o.first_name} ${o.last_name}`,
            items: []
        }));

        const orderIds = validOrders.map(o => o.order_id);
        const itemsQuery = `
            SELECT 
                oi.order_id, 
                oi.isbn, 
                oi.quantity, 
                oi.price, 
                b.Title as title 
            FROM order_items oi
            JOIN Books b ON oi.isbn = b.ISBN
            WHERE oi.order_id IN (?)
        `;

        const items = await query(itemsQuery, [orderIds]);

        // Map items to orders
        const ordersMap = {};
        validOrders.forEach(o => ordersMap[o.order_id] = o);

        items.forEach(item => {
            if (ordersMap[item.order_id]) {
                ordersMap[item.order_id].items.push(item);
            }
        });

        return res.status(200).json(Object.values(ordersMap));

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.updateCustomerOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Pending', 'Shipped', 'Delivered', 'Cancelled'

        if (!status) return res.status(400).json("Status is required.");

        await query("UPDATE customer_orders SET status = ? WHERE order_id = ?", [status, id]);

        return res.status(200).json("Order status updated successfully.");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getLowStockBooks = async (req, res) => {
    try {
        const books = await query(`
            SELECT Books.*, Publishers.Name as publisher 
            FROM Books 
            LEFT JOIN Publishers ON Books.publisher_id = Publishers.publisher_id
            WHERE Stock < Threshold
        `);
        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllPublisherOrders = async (req, res) => {
    try {
        const orders = await query(`
            SELECT 
                po.order_id as id,
                po.isbn,
                b.Title as title,
                p.Name as publisher,
                po.quantity as orderQuantity,
                po.status,
                po.order_date as date
            FROM publisher_orders po
            JOIN Books b ON po.isbn = b.ISBN
            LEFT JOIN Publishers p ON b.publisher_id = p.publisher_id
            ORDER BY po.order_date DESC
        `);
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.placePublisherOrder = async (req, res) => {
    try {
        const { isbn, quantity } = req.body;

        // Find publisher for the book
        const book = await query("SELECT publisher_id FROM Books WHERE ISBN = ?", [isbn]);
        if (book.length === 0) return res.status(404).json("Book not found.");

        const publisherId = book[0].publisher_id;

        await query(
            "INSERT INTO publisher_orders (isbn, publisher_id, quantity, status, order_date) VALUES (?, ?, ?, 'Pending', NOW())",
            [isbn, publisherId, quantity]
        );

        return res.status(201).json("Restock order placed successfully.");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.confirmPublisherOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // Start transaction
        await query("START TRANSACTION");

        const order = await query("SELECT * FROM publisher_orders WHERE order_id = ? AND status = 'Pending'", [id]);
        if (order.length === 0) {
            await query("ROLLBACK");
            return res.status(404).json("Order not found or already confirmed.");
        }

        const { isbn, quantity } = order[0];

        // Update order status
        await query("UPDATE publisher_orders SET status = 'Received' WHERE order_id = ?", [id]);

        // Update book stock
        await query("UPDATE Books SET Stock = Stock + ? WHERE ISBN = ?", [quantity, isbn]);

        await query("COMMIT");
        return res.status(200).json("Order confirmed and stock updated.");

    } catch (err) {
        await query("ROLLBACK");
        return res.status(500).json({ error: err.message });
    }
};
