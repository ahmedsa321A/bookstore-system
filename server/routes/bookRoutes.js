const express = require('express');
const bookController = require('../controllers/bookController');
const bookControllerAdmin = require('../controllers/bookControllerAdmin');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { validateAddBook, validateModifyBook } = require('../middleware/bookValidation');

const router = express.Router();

router.get('/', bookController.searchBooks); // Defaulting to search as getBooks is gone/renamed
router.get('/search', bookController.searchBooks);

router.post('/add', verifyToken, verifyAdmin, validateAddBook, bookControllerAdmin.addBook);
router.put('/update/:isbn', verifyToken, verifyAdmin, validateModifyBook, bookControllerAdmin.modifyBook);
router.delete('/delete/:isbn', verifyToken, verifyAdmin, bookControllerAdmin.deleteBook);

module.exports = router;
