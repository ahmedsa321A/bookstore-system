const db = require("../config/db");
const util = require("util");

const query = util.promisify(db.query).bind(db);

exports.addBook = async (req, res) => {
  try {
    const {isbn, title, publication_year, price, stock, threshold, publisher_id, category,} = req.body;

    const existingBooks = await query("SELECT * FROM Books WHERE ISBN = ?", [isbn,]);
    if (existingBooks.length > 0) return res.status(409).json("Book with this ISBN already exists!");

    const insertQuery = "INSERT INTO Books (ISBN, Title, PublicationYear, Price, Stock, Threshold, PublisherID, Category) VALUES (?)";
    const values = [isbn, title, publication_year, price, stock, threshold, publisher_id, category,];

    await query(insertQuery, [values]);
    return res.status(201).json("Book added successfully!");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.modifyBook = async (req, res) => {
  try {
    const targetISBN = req.params.isbn;

    const results = await query("SELECT * FROM Books WHERE ISBN = ?", [targetISBN,]);
    if (results.length === 0) return res.status(404).json("Book not found!");

    let currentBook = results[0];
    const updates = req.body;

    if (updates.title) currentBook.Title = updates.title;
    if (updates.publication_year) currentBook.PublicationYear = updates.publication_year;
    if (updates.price !== undefined) currentBook.Price = updates.price;
    if (updates.threshold !== undefined) currentBook.Threshold = updates.threshold;
    if (updates.publisher_id) currentBook.PublisherID = updates.publisher_id;
    if (updates.category) currentBook.Category = updates.category;

    if (updates.stock !== undefined) {
      if (updates.stock < currentBook.Stock) {
        return res.status(400).json("New stock cannot be less than current stock.");
        }
      currentBook.Stock = updates.stock;
    }

    if (currentBook.Stock < currentBook.Threshold) {
      return res.status(400).json("Stock cannot be less than threshold.");
    }

    const updateQuery = `
      UPDATE Books 
      SET Title = ?, PublicationYear = ?, Price = ?, Stock = ?, Threshold = ?, PublisherID = ?, Category = ? 
      WHERE ISBN = ?`;

    const values = [
      currentBook.Title,
      currentBook.PublicationYear,
      currentBook.Price,
      currentBook.Stock,
      currentBook.Threshold,
      currentBook.PublisherID,
      currentBook.Category,
      targetISBN,
    ];

    await query(updateQuery, values);
    return res.status(200).json("Book modified successfully!");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBookByISBN = async (req, res) => {
  try {
    const bookISBN = req.params.isbn || req.body.isbn;
    const result = await query("SELECT * FROM Books WHERE ISBN = ?", [
      bookISBN,
    ]);

    if (result.length === 0) return res.status(404).json("Book not found");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBooksByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const result = await query("SELECT * FROM Books WHERE Title LIKE ?", [
      `%${title}%`,
    ]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBooksByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const result = await query("SELECT * FROM Books WHERE Category = ?", [
      category,
    ]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const authorName = req.params.authorName;
    const selectQuery = `
        SELECT Books.* FROM Books
        JOIN BookAuthors ON Books.BookID = BookAuthors.BookID
        JOIN Authors ON BookAuthors.AuthorID = Authors.AuthorID
        WHERE Authors.Name = ?
    `;
    const result = await query(selectQuery, [authorName]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const result = await query("DELETE FROM Books WHERE BookID = ?", [bookId]);

    if (result.affectedRows === 0)
      return res.status(404).json("Book not found or already deleted.");
    return res.status(200).json("Book deleted successfully!");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
