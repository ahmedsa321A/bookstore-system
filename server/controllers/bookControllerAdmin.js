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
            image,
            author,
        } = req.body;

        const existingBooks = await query("SELECT * FROM Books WHERE ISBN = ?", [
            isbn,
        ]);
        if (existingBooks.length > 0)
            return res.status(409).json("Book with this ISBN already exists!");

        await query("START TRANSACTION");

        const authorNames = Array.isArray(author) ? author : [author];
        const authorIds = [];

        try {
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
            let finalPublisherId = publisher_id;
            if (!finalPublisherId && req.body.publisher) {
                // Check publisher existence (lowercase keys based on schema check)
                const existingPublisher = await query("SELECT publisher_id FROM Publishers WHERE Name = ?", [req.body.publisher]);
                if (existingPublisher.length > 0) {
                    finalPublisherId = existingPublisher[0].publisher_id;
                } else {
                    const result = await query("INSERT INTO Publishers (Name, Address, Phone) VALUES (?, ?, ?)", [req.body.publisher, 'Unknown', 'Unknown']);
                    finalPublisherId = result.insertId;
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
                finalPublisherId,
                category,
                finalImage,
            ];

            await query(insertQuery, [values]);

            // 5. Link Book and Authors
            for (const authId of authorIds) {
                await query("INSERT INTO bookauthors (isbn, author_id) VALUES (?, ?)", [isbn, authId]);
            }

            await query("COMMIT");
            return res.status(201).json("Book added successfully!");

        } catch (innerErr) {
            await query("ROLLBACK");
            throw innerErr;
        }

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ error: "Invalid Publisher ID. This publisher does not exist." });
        }
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
        const newTitle = updates.title || currentBook.title;
        const newYear = updates.publication_year || currentBook.publication_year;
        const newPrice = updates.price !== undefined ? updates.price : currentBook.price;
        const newStock = updates.stock !== undefined ? updates.stock : currentBook.stock;
        const newThreshold = updates.threshold !== undefined ? updates.threshold : currentBook.threshold;
        const newPubId = updates.publisher_id || currentBook.publisher_id;
        const newCategory = updates.category || currentBook.category;
        const newImage = updates.image || currentBook.image;

        const updateQuery = `
      UPDATE Books 
      SET Title = ?, publication_year = ?, Price = ?, Stock = ?, Threshold = ?, publisher_id = ?, Category = ?, Image = ? 
      WHERE ISBN = ?`;

        const values = [
            newTitle,
            newYear,
            newPrice,
            newStock,
            newThreshold,
            newPubId,
            newCategory,
            newImage,
            targetISBN,
        ];

        await query(updateQuery, values);
        return res.status(200).json("Book modified successfully!");
    } catch (err) {
        if (err.sqlState === '45000') {
            return res.status(400).json(err.message);
        }
        return res.status(500).json({ error: err.message });
    }
};
exports.deleteBook = async (req, res) => {
    try {
        const isbn = req.params.isbn;

        await query("START TRANSACTION");

        try {
            // 1. Delete relations in BookAuthors
            await query("DELETE FROM bookauthors WHERE isbn = ?", [isbn]);

            // 2. Delete the Book
            const result = await query("DELETE FROM Books WHERE ISBN = ?", [isbn]);

            if (result.affectedRows === 0) {
                await query("ROLLBACK");
                return res.status(404).json("Book not found or already deleted.");
            }

            await query("COMMIT");
            return res.status(200).json("Book deleted successfully!");

        } catch (innerErr) {
            await query("ROLLBACK");
            if (innerErr.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json("Cannot delete book because it has associated orders or other dependencies.");
            }
            throw innerErr;
        }

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
exports.getAllPublishers = async (req, res) => {
    try {
        const publishers = await query("SELECT * FROM Publishers");
        return res.status(200).json(publishers);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }



};


