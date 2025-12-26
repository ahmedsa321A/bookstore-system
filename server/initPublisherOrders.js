const db = require('./config/db');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS publisher_orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) NOT NULL,
    publisher_id INT, 
    quantity INT NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Received') DEFAULT 'Pending',
    order_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (isbn) REFERENCES Books(ISBN)
);
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating table:", err);
        process.exit(1);
    }
    console.log("publisher_orders table created or already exists.");
    process.exit(0);
});
