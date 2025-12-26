const db = require('../config/db');
const util = require('util');

// Promisify the query function to use async/await
const query = util.promisify(db.query).bind(db);

exports.addBook = async (req, res) => {
    try {
        const {
            isbn,
            title,
            publication_year,
            price,
            stock,
            threshold,
            publisher_id,
            category,
        } = req.body;

        const existingBooks = await query("SELECT * FROM Books WHERE ISBN = ?", [
            isbn,
        ]);
        if (existingBooks.length > 0)
            return res.status(409).json("Book with this ISBN already exists!");

        const insertQuery =
            "INSERT INTO Books (ISBN, Title, publication_year, Price, Stock, Threshold, publisher_id, Category) VALUES (?)";
        const values = [
            isbn,
            title,
            publication_year,
            price,
            stock,
            threshold,
            publisher_id,
            category,
        ];

        await query(insertQuery, [values]);
        return res.status(201).json("Book added successfully!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.modifyBook = async (req, res) => {
    // TODO: Add check to ensure modifications are valid regarding sold copies
    try {
        const targetISBN = req.params.isbn;

        const results = await query("SELECT * FROM Books WHERE ISBN = ?", [
            targetISBN,
        ]);
        if (results.length === 0) return res.status(404).json("Book not found!");

        let currentBook = results[0];
        const updates = req.body;

        if (updates.title) currentBook.Title = updates.title;
        if (updates.publication_year)
            currentBook.publication_year = updates.publication_year;
        if (updates.price !== undefined) currentBook.Price = updates.price;
        if (updates.threshold !== undefined)
            currentBook.Threshold = updates.threshold;
        if (updates.publisher_id) currentBook.publisher_id = updates.publisher_id;
        if (updates.category) currentBook.Category = updates.category;

        if (updates.stock !== undefined) {
            if (updates.stock < 0) {
                return res.status(400).json("Stock cannot be negative.");
            }
            currentBook.Stock = updates.stock;
        }

        if (currentBook.Stock < currentBook.Threshold) {
            return res.status(400).json("Stock cannot be less than threshold.");
        }

        const updateQuery = `
      UPDATE Books 
      SET Title = ?, publication_year = ?, Price = ?, Stock = ?, Threshold = ?, publisher_id = ?, Category = ? 
      WHERE ISBN = ?`;

        const values = [
            currentBook.Title,
            currentBook.publication_year,
            currentBook.Price,
            currentBook.Stock,
            currentBook.Threshold,
            currentBook.publisher_id,
            currentBook.Category,
            targetISBN,
        ];

        await query(updateQuery, values);
        return res.status(200).json("Book modified successfully!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.deleteBook = async (req, res) => {
    try {
        const isbn = req.params.isbn;

        const result = await query("DELETE FROM Books WHERE ISBN = ?", [isbn]);

        if (result.affectedRows === 0)
            return res.status(404).json("Book not found or already deleted.");
        return res.status(200).json("Book deleted successfully!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};