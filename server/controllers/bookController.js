const db = require("../config/db");
const util = require("util");

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

// ==========%^#@&^*$&*&(*@!(#)(*!*&)!@$@#$+!_)+!@_#+@)_#_+)@#+_!)@+$#++@#!$(*)_@#_$==========
// NOTE: there is missing part to check that he will modify only when one or more copy is sold
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

    if (updates.stock !== undefined) {
      if (updates.stock < 0) {
        return res.status(400).json("Stock cannot be negative.");
      }
      //   if (updates.stock < currentBook.Stock) {
      //     return res
      //       .status(400)
      //       .json("New stock cannot be less than current stock.");
      //   }
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

exports.searchBooks = async (req, res) => {
  // try {
  //   const { isbn, title, category, author, publisher } = req.query;
  //     if (isbn) return getBookByISBN(isbn);
  //     if (title) return getBooksByTitle(title);
  //     if (category) return getBooksByCategory(category, res);
  //     if (author) return getBooksByAuthor(author);
  //     if (publisher) return getBooksByPublisher(publisher);
  //     return res.status(400).json("At least one search parameter must be provided.");
  // } catch (err) {
  //   return res.status(500).json({ error: err.message });
  // }
  try {
    const { isbn, title, category, author, publisher } = req.query;
    let queryStr = "SELECT DISTINCT Books.* FROM Books ";
    let conditions = [];
    let joins = [];
    let values = [];
    if (author) {
      joins.push("JOIN BookAuthors ON Books.BookID = BookAuthors.BookID");
      joins.push("JOIN Authors ON BookAuthors.AuthorID = Authors.AuthorID");
      conditions.push("Authors.Name = ?");
      values.push(author);
    }
    if (publisher) {
      joins.push(
        "JOIN Publishers ON Books.publisher_id = Publishers.publisher_id"
      );
      conditions.push("Publishers.Name = ?");
      values.push(publisher);
    }
    if (isbn) {
      conditions.push("Books.ISBN = ?");
      values.push(isbn);
    }
    if (title) {
      conditions.push("Books.Title LIKE ?");
      values.push(`%${title}%`);
    }
    if (category) {
      conditions.push("Books.Category = ?");
      values.push(category);
    }
    if (joins.length > 0) {
      queryStr += joins.join(" ") + " ";
    }
    if (conditions.length > 0) {
      queryStr += "WHERE " + conditions.join(" AND ");
    }
    const result = await query(queryStr, values);
    if (result.length === 0) return res.status(404).json("No books found.");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// const getBookByISBN = async (bookISBN, res) => {
//   try {
//     const result = await query("SELECT * FROM Books WHERE ISBN = ?", [
//       bookISBN,
//     ]);

//     if (result.length === 0) return res.status(404).json("Book not found");
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

// const getBooksByTitle = async (title, res) => {
//   try {
//     const result = await query("SELECT * FROM Books WHERE Title LIKE ?", [
//       `%${title}%`,
//     ]);
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

// const getBooksByCategory = async (category, res) => {
//   try {
//     const result = await query("SELECT * FROM Books WHERE Category = ?", [
//       category,
//     ]);
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

// const getBooksByAuthor = async (authorName, res) => {
//   try {
//     const selectQuery = `
//         SELECT DISTINCT Books.* FROM Books
//         JOIN BookAuthors ON Books.BookID = BookAuthors.BookID
//         JOIN Authors ON BookAuthors.AuthorID = Authors.AuthorID
//         WHERE Authors.Name = ?
//     `;
//     const result = await query(selectQuery, [authorName]);
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

// const getBooksByPublisher = async (publisherName, res) => {
//   try {
//     const selectQuery = `
//         SELECT DISTINCT Books.* FROM Books
//         JOIN Publishers ON Books.publisher_id = Publishers.publisher_id
//         WHERE Publishers.Name = ?
//     `;
//     const result = await query(selectQuery, [publisherName]);
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

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
