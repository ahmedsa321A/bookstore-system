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
            publisher, // Now accepting name
            category,
            image,
            author, // Author name array
        } = req.body;

        const existingBooks = await query("SELECT * FROM Books WHERE ISBN = ?", [
            isbn,
        ]);
        if (existingBooks.length > 0)
            return res.status(409).json("Book with this ISBN already exists!");

        // 1. Handle Authors
        const authorNames = Array.isArray(author) ? author : [author];
        const authorIds = [];

        for (const authorName of authorNames) {
            if (!authorName) continue;
            const existingAuthor = await query("SELECT author_id FROM authors WHERE name = ?", [authorName]);

            if (existingAuthor.length > 0) {
                authorIds.push(existingAuthor[0].author_id);
            } else {
                const result = await query("INSERT INTO authors (name) VALUES (?)", [authorName]);
                authorIds.push(result.insertId);
            }
        }

        // 2. Handle Publisher
        let publisherId = null;
        if (publisher) {
            const existingPublisher = await query("SELECT publisher_id FROM Publishers WHERE Name = ?", [publisher]);
            if (existingPublisher.length > 0) {
                publisherId = existingPublisher[0].publisher_id;
            } else {
                // Determine a default address/phone or leave null if allowed, strictly insert Name for now
                // Schema likely requires fields? 'initPublisherOrders.js' didn't show Publishers schema.
                // Assuming Name is enough or others nullable. 
                // 'addPublisher' controller uses Name, Address, Phone. 
                // Let's insert with defaults if needed.
                const result = await query("INSERT INTO Publishers (Name, Address, Phone) VALUES (?, ?, ?)", [publisher, 'Unknown', 'Unknown']);
                publisherId = result.insertId;
            }
        }

        // 3. Handle Image
        const finalImage = image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2730&ixlib=rb-4.0.3';

        // 4. Insert Book
        const insertQuery =
            "INSERT INTO Books (ISBN, Title, publication_year, Price, Stock, Threshold, publisher_id, Category, Image) VALUES (?)";
        const values = [
            isbn,
            title,
            publication_year,
            price,
            stock,
            threshold,
            publisherId,
            category,
            finalImage,
        ];

        await query(insertQuery, [values]);

        // 5. Link Book and Authors
        for (const authId of authorIds) {
            await query("INSERT INTO bookauthors (isbn, author_id) VALUES (?, ?)", [isbn, authId]);
        }

        return res.status(201).json("Book added successfully!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.modifyBook = async (req, res) => {
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
        if (updates.image) currentBook.Image = updates.image;

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
      SET Title = ?, publication_year = ?, Price = ?, Stock = ?, Threshold = ?, publisher_id = ?, Category = ?, Image = ? 
      WHERE ISBN = ?`;

        const values = [
            currentBook.Title,
            currentBook.publication_year,
            currentBook.Price,
            currentBook.Stock,
            currentBook.Threshold,
            currentBook.publisher_id,
            currentBook.Category,
            currentBook.Image,
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
exports.addAuthor = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json("Author name is required.");

        // Check if author already exists
        const existing = await query("SELECT * FROM Authors WHERE Name = ?", [name]);
        if (existing.length > 0) {
            return res.status(409).json("Author already exists.");
        }

        await query("INSERT INTO Authors (Name) VALUES (?)", [name]);
        return res.status(201).json("Author added successfully!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.addPublisher = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        if (!name) return res.status(400).json("Publisher name is required.");

        // Check if publisher already exists
        const existing = await query("SELECT * FROM Publishers WHERE Name = ?", [name]);
        if (existing.length > 0) {
            return res.status(409).json("Publisher already exists.");
        }

        const insertQuery = "INSERT INTO Publishers (Name, Address, Phone) VALUES (?)";
        const values = [name, address, phone];

        await query(insertQuery, [values]);
        return res.status(201).json("Publisher added successfully!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

};