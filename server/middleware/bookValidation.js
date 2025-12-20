const getValidationErrors = (data ={}, isUpdate = false) => {
    const { isbn, title, publication_year, price, stock, threshold, publisher_id, category } = data;
    const errors = [];

    if (!isUpdate) {
        if (!isbn || !title || !publication_year || price === undefined || stock === undefined || threshold === undefined || !publisher_id || !category) {
            return ["All fields are required."];
        }
    }

    if (isbn && isbn.length !== 13) errors.push("ISBN must be exactly 13 characters long.");
    if (title && title.length > 255) errors.push("Title cannot exceed 255 characters.");
    if (price !== undefined && price < 0) errors.push("Price cannot be negative.");
    if (stock !== undefined && threshold !== undefined && stock < threshold) errors.push("Stock cannot be less than threshold.");
    
    if (category && !["Science", "Art", "Religion", "History", "Geography"].includes(category)) {
        errors.push("Invalid category.");
    }

    return errors;
};

exports.validateAddBook = (req, res, next) => {
    const errors = getValidationErrors(req.body, false);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

exports.validateModifyBook = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No fields provided for update." });
    }

    const errors = getValidationErrors(req.body, true);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};