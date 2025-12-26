const db = require('../config/db');
const util = require('util');

// Promisify the query function here as well
const query = util.promisify(db.query).bind(db);

exports.searchBooks = async (req, res) => {
  try {
    const { isbn, title, category, author, publisher } = req.query;
    let queryStr = `
        SELECT Books.*, Publishers.Name as publisher, GROUP_CONCAT(Authors.Name SEPARATOR ', ') as authors 
        FROM Books 
        LEFT JOIN Publishers ON Books.publisher_id = Publishers.publisher_id
        LEFT JOIN BookAuthors ON Books.ISBN = BookAuthors.isbn
        LEFT JOIN Authors ON BookAuthors.author_id = Authors.author_id
    `;
    let conditions = [];
    let values = [];

    // Note: The previous logic for filtering was a bit complex with joins being added conditionally.
    // Since we now ALWAYS join to get the data, we can just add WHERE clauses.
    // However, for strict filtering (e.g. searching for a specific author), the WHERE clause on the left-joined table works.

    if (author) {
      conditions.push("Authors.Name LIKE ?"); // Relaxed to LIKE for better search? Or keep exact? Previous was exact.
      values.push(`%${author}%`);
    }
    if (publisher) {
      conditions.push("Publishers.Name LIKE ?");
      values.push(`%${publisher}%`);
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

    if (conditions.length > 0) {
      queryStr += " WHERE " + conditions.join(" AND ");
    }

    queryStr += " GROUP BY Books.ISBN";

    const result = await query(queryStr, values);

    // transform authors string to array
    const mappedResult = result.map(book => ({
      ...book,
      authors: book.authors ? book.authors.split(', ') : []
    }));

    if (mappedResult.length === 0) return res.status(404).json("No books found.");
    return res.status(200).json(mappedResult);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};