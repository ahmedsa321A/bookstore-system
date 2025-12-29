const db = require('../config/db');


exports.addBook = async (req, res) => {
    try {
        const pdfFilename = req.file ? req.file.filename : null;

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

        const [existingBooks] = await db.query("SELECT * FROM books WHERE isbn = ?", [isbn]);
        if (existingBooks.length > 0) {
            return res.status(409).json("Book with this ISBN already exists!");
        }

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const authorNames = Array.isArray(author) ? author : [author];
            const authorIds = [];

            for (const authorName of authorNames) {
                if (!authorName) continue;
                const [existingAuthor] = await connection.query("SELECT author_id FROM authors WHERE name = ?", [authorName]);

                if (existingAuthor.length > 0) {
                    authorIds.push(existingAuthor[0].author_id);
                } else {
                    const [result] = await connection.query("INSERT INTO authors (name) VALUES (?)", [authorName]);
                    authorIds.push(result.insertId);
                }
            }

            let finalPublisherId = publisher_id;
            if (!finalPublisherId && req.body.publisher) {
                const [existingPublisher] = await connection.query("SELECT publisher_id FROM publishers WHERE name = ?", [req.body.publisher]);
                if (existingPublisher.length > 0) {
                    finalPublisherId = existingPublisher[0].publisher_id;
                } else {
                    const [result] = await connection.query("INSERT INTO publishers (name, address, phone) VALUES (?, ?, ?)", [req.body.publisher, 'Unknown', 'Unknown']);
                    finalPublisherId = result.insertId;
                }
            }

            const finalImage = image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2730&ixlib=rb-4.0.3';

            const insertQuery = `
                INSERT INTO books 
                (isbn, title, publication_year, price, stock, threshold, publisher_id, category, image, pdf_path) 
                VALUES (?)
            `;

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
                pdfFilename 
            ];

            await connection.query(insertQuery, [values]);

            for (const authId of authorIds) {
                await connection.query("INSERT INTO bookauthors (isbn, author_id) VALUES (?, ?)", [isbn, authId]);
            }

            await connection.commit();
            return res.status(201).json("Book added successfully with PDF!");

        } catch (innerErr) {
            await connection.rollback();
            throw innerErr;
        } finally {
            connection.release();
        }

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ error: "Invalid Publisher ID. This publisher does not exist." });
        }
        console.error("Add Book Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.modifyBook = async (req, res) => {
    try {
        const targetISBN = req.params.isbn;

        const [results] = await db.query("SELECT * FROM Books WHERE ISBN = ?", [
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

        await db.query(updateQuery, values);
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

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            await connection.query("DELETE FROM bookauthors WHERE isbn = ?", [isbn]);

            const [result] = await connection.query("DELETE FROM Books WHERE ISBN = ?", [isbn]);

            if (result.affectedRows === 0) {
                await connection.rollback();
                return res.status(404).json("Book not found or already deleted.");
            }

            await connection.commit();
            return res.status(200).json("Book deleted successfully!");

        } catch (innerErr) {
            await connection.rollback();
            if (innerErr.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json("Cannot delete book because it has associated orders or other dependencies.");
            }
            throw innerErr;
        } finally {
            connection.release();
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
        const [existing] = await db.query("SELECT * FROM Authors WHERE Name = ?", [name]);
        if (existing.length > 0) {
            return res.status(409).json("Author already exists.");
        }

        await db.query("INSERT INTO Authors (Name) VALUES (?)", [name]);
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
        const [existing] = await db.query("SELECT * FROM Publishers WHERE Name = ?", [name]);
        if (existing.length > 0) {
            return res.status(409).json("Publisher already exists.");
        }

        const insertQuery = "INSERT INTO Publishers (Name, Address, Phone) VALUES (?)";
        const values = [name, address, phone];

        await db.query(insertQuery, [values]);
        return res.status(201).json("Publisher added successfully!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

};

exports.getAllPublishers = async (req, res) => {
    try {
        const [publishers] = await db.query("SELECT * FROM Publishers");
        return res.status(200).json(publishers);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


