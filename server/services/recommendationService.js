const db = require("../config/db");
function query(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

async function getContentBasedRecommendations(customerId, limit = 10) {
    try {
        // 1. Purchased books
        const purchased = await query(
            `
            SELECT DISTINCT oi.ISBN
            FROM Order_Items oi
            JOIN Customer_Orders co ON oi.order_id = co.order_id
            WHERE co.customer_id = ?
            `,
            [customerId]
        );

        if (purchased.length === 0) {
            return getFallbackRecommendations(limit);
        }

        const purchasedISBNs = purchased.map(b => b.ISBN);

        // 2. Preferred authors & categories
        const preferences = await query(
            `
            SELECT DISTINCT ba.author_id, b.category
            FROM Books b
            JOIN Book_Authors ba ON b.ISBN = ba.ISBN
            WHERE b.ISBN IN (?)
            `,
            [purchasedISBNs]
        );

        const authorIds = preferences.map(p => p.author_id).filter(Boolean);
        const categories = preferences.map(p => p.category).filter(Boolean);

        // 3. Recommendations
        const recommendations = await query(
            `
            SELECT DISTINCT b.*
            FROM Books b
            LEFT JOIN Book_Authors ba ON b.ISBN = ba.ISBN
            WHERE (
                ba.author_id IN (?)
                OR b.category IN (?)
            )
            AND b.ISBN NOT IN (?)
            LIMIT ?
            `,
            [
                authorIds.length ? authorIds : [-1],
                categories.length ? categories : [-1],
                purchasedISBNs,
                limit
            ]
        );

        return recommendations;
    } catch (err) {
        console.error("Error generating recommendations:", err);
        return [];
    }
}

async function getFallbackRecommendations(limit) {
    return await query(
        `
        SELECT *
        FROM Books
        ORDER BY stock DESC
        LIMIT ?
        `,
        [limit]
    );
}

module.exports = { getContentBasedRecommendations };