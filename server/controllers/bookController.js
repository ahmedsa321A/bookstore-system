const db = require("../config/db");
const util = require("util");

const query = util.promisify(db.query).bind(db);
exports.searchBooks = async (req, res) => {
  try {
    const { isbn, title, category, author, publisher } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let queryStr = `
        SELECT Books.*, 
               Publishers.Name AS publisher_name, 
               GROUP_CONCAT(Authors.Name SEPARATOR ', ') AS authors 
        FROM Books 
    `;

    let countQueryStr = `
        SELECT COUNT(DISTINCT Books.ISBN) as total
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

    const joinStr = joins.join(" ") + " ";

    queryStr += joinStr;
    countQueryStr += joinStr; // Join is needed for filtering by author/publisher

    if (conditions.length > 0) {
      const conditionStr = "WHERE " + conditions.join(" AND ");
      queryStr += conditionStr;
      countQueryStr += conditionStr;
    }

    queryStr += " GROUP BY Books.ISBN";

    queryStr += " LIMIT ? OFFSET ? ";
    values.push(limit, offset);

    // Values for the main query include pagination
    const queryValues = [...values, limit, offset];

    // Execute queries
    const [books] = await db.promise().query(queryStr, queryValues);
    const [countResult] = await db.promise().query(countQueryStr, values);

    const total = countResult[0]?.total || 0;

    return res.status(200).json({
      books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
