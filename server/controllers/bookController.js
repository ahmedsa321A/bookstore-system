const db = require('../config/db');
const util = require('util');

// Promisify the query function here as well
const query = util.promisify(db.query).bind(db);

exports.searchBooks = async (req, res) => {
  try {
    const { isbn, title, category, author, publisher } = req.query;
    let queryStr = "SELECT DISTINCT Books.* FROM Books ";
    let conditions = [];
    let joins = [];
    let values = [];

    if (author) {
      joins.push("JOIN BookAuthors ON Books.ISBN = BookAuthors.isbN");
      joins.push("JOIN Authors ON BookAuthors.author_id = Authors.author_id");
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