const getValidationErrors = (data = {}, isUpdate = false) => {
    const { isbn, title, publication_year, price, stock, threshold, publisher_id, category, author } = data;
    const errors = [];

    if (!isUpdate) {
        if (!isbn || !title || !publication_year || price === undefined || stock === undefined || threshold === undefined || (!publisher_id && !data.publisher) || !category) {
            return ["All fields are required."];
        }
        if (!author || (Array.isArray(author) && author.length === 0)) {
            return ["At least one author is required."];
        }
    }



    if (price !== undefined && price < 0) errors.push("Price cannot be negative.");


    if (category && !["Science", "Art", "Religion", "History", "Geography"].includes(category)) {
    };

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
