const db = require('../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);

const getThreeMonthsAgoDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    return d.toISOString().split('T')[0];
};

exports.getSalesLastMonth = async (req, res) => {
    try {
        const sql = `
            SELECT SUM(total_price) as total_sales 
            FROM customer_orders 
            WHERE YEAR(order_date) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH)
            AND MONTH(order_date) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)
        `;

        const result = await query(sql);
        return res.status(200).json({
            period: "Previous Month",
            total_sales: result[0].total_sales || 0
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getSalesByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json("Date query parameter is required.");

        const sql = `
            SELECT SUM(total_price) as total_sales 
            FROM customer_orders 
            WHERE order_date = ?
        `;

        const result = await query(sql, [date]);
        return res.status(200).json({
            date: date,
            total_sales: result[0].total_sales || 0
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getTopCustomers = async (req, res) => {
    try {
        const dateLimit = getThreeMonthsAgoDate();

        const sql = `
            SELECT 
                c.user_id, 
                c.first_name, 
                c.last_name, 
                c.email,
                SUM(co.total_price) as total_spent
            FROM customer_orders co
            JOIN customers c ON co.customer_id = c.user_id
            WHERE co.order_date >= ?
            GROUP BY c.user_id
            ORDER BY total_spent DESC
            LIMIT 5
        `;

        const result = await query(sql, [dateLimit]);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getTopSellingBooks = async (req, res) => {
    try {
        const dateLimit = getThreeMonthsAgoDate();

        const sql = `
            SELECT 
                b.isbn, 
                b.title, 
                SUM(oi.quantity) as total_copies_sold
            FROM order_items oi
            JOIN customer_orders co ON oi.order_id = co.order_id
            JOIN books b ON oi.isbn = b.isbn
            WHERE co.order_date >= ?
            GROUP BY b.isbn
            ORDER BY total_copies_sold DESC
            LIMIT 10
        `;

        const result = await query(sql, [dateLimit]);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getBookReplenishmentStats = async (req, res) => {
    try {
        const { isbn } = req.params;

        const sql = `
            SELECT 
                b.title,
                COUNT(poi.publisher_order_id) as times_ordered,
                SUM(poi.quantity) as total_quantity_received
            FROM publisher_order_items poi
            JOIN books b ON poi.isbn = b.isbn
            WHERE poi.isbn = ?
            GROUP BY b.isbn
        `;

        const result = await query(sql, [isbn]);

        if (result.length === 0) return res.status(200).json({ message: "No replenishment orders found for this book." });

        return res.status(200).json(result[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};