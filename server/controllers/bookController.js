const db = require("../config/db");

exports.searchBooks = async (req, res) => {
  try {
    const { isbn, title, category, author, publisher } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // 1. Base Query Construction
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

    // 2. Filter Logic
    let conditions = [];
    let values = []; // This array stays CLEAN (only filters)

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

    // 3. Combine Queries
    const joinStr = joins.join(" ") + " ";
    queryStr += joinStr;
    countQueryStr += joinStr; 

    if (conditions.length > 0) {
      const conditionStr = "WHERE " + conditions.join(" AND ");
      queryStr += conditionStr;
      countQueryStr += conditionStr;
    }

    queryStr += " GROUP BY Books.ISBN";
    
    // 4. Pagination
    queryStr += " LIMIT ? OFFSET ? ";
    
    // Create a NEW array for the main query that includes limit/offset
    // We do NOT modify 'values' because 'countQueryStr' needs 'values' without limits.
    const queryValues = [...values, limit, offset];

    // 5. Execute
    // Note: We use 'db.query' directly because we exported 'pool.promise()' in config/db.js
    const [books] = await db.query(queryStr, queryValues);
    const [countResult] = await db.query(countQueryStr, values);

    const total = countResult[0]?.total || 0;

    return res.status(200).json({
      books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error("Search Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const queryStr = "SELECT * FROM Authors ORDER BY Name ASC";
    const [authors] = await db.query(queryStr);
    return res.status(200).json(authors);
  } catch (err) {
    console.error("Authors Error:", err);
    return res.status(500).json({ error: err.message });
  }
};