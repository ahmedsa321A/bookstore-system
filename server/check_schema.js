const db = require('./config/db');

async function checkSchema() {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM Publishers LIMIT 1", (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        console.log("Publishers Keys:", rows.length > 0 ? Object.keys(rows[0]) : "No publishers found");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkSchema();
