const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

const { validateAddBook, validateModifyBook } = require('../middleware/bookValidation');

router.post('/add', validateAddBook, bookController.addBook);
router.put('/update/:isbn', validateModifyBook, bookController.modifyBook);

router.get('/:isbn', bookController.getBookByISBN);

module.exports = router;