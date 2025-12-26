const db = require("../config/db");
const util = require("util");

const query = util.promisify(db.query).bind(db);
exports.searchBooks = async (req, res) => {
  try {
    const { isbn, title, category, author, publisher, page, limit } = req.query;

    page = parseInt(page) || 0;
    limit = parseInt(limit) || 10;
    const offset = page * limit;

    let queryStr = `
        SELECT Books.*, 
               Publishers.Name AS publisher_name, 
               GROUP_CONCAT(Authors.Name SEPARATOR ', ') AS authors 
        FROM Books 
    `;

    let joins = [
      "LEFT JOIN Publishers ON Books.publisher_id = Publishers.publisher_id",
      "LEFT JOIN BookAuthors ON Books.ISBN = BookAuthors.ISBN",
      "LEFT JOIN Authors ON BookAuthors.author_id = Authors.author_id",
    ];

    let conditions = [];
    let values = [];

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
    if (author) {
      conditions.push("Authors.Name LIKE ?");
      values.push(`%${author}%`);
    }
    if (publisher) {
      conditions.push("Publishers.Name LIKE ?");
      values.push(`%${publisher}%`);
    }

    queryStr += joins.join(" ") + " ";

    if (conditions.length > 0) {
      queryStr += "WHERE " + conditions.join(" AND ");
    }

    queryStr += " GROUP BY Books.ISBN";
    queryStr += " LIMIT ? OFFSET ? ";
    values.push(limit, offset);

    const result = await query(queryStr, values);

    if (result.length === 0 && (isbn || title || category)) {
      return res.status(404).json("No books found.");
    }

    return res.status(200).json({
      page,
      limit,
      total: result,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
