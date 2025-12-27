const db = require("../config/db");

exports.confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const [results] = await db.query(
      `
        SELECT * 
        FROM Publisher_orders as po
        JOIN publisher_order_items as poi ON po.publisher_order_id = poi.publisher_order_id
        WHERE po.publisher_order_id = ?
        `,
      [orderId]
    );

    if (results.length === 0) {
      return res.status(404).json("Order not found!");
    }

    const isbn = results[0].ISBN;
    const quantity = results[0].Quantity;

    await db.query(
      `
        UPDATE Books
        SET Stock = Stock + ?
        WHERE ISBN = ?
        `,
      [quantity, isbn]
    );

    await db.query(
      `
        UPDATE Publisher_orders
        SET Status = 'Confirmed'
        WHERE publisher_order_id = ?
        `,
      [orderId]
    );

    return res
      .status(200)
      .json("Order confirmed and stock updated successfully!");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// system reports
