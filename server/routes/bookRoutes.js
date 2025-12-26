const express = require('express');
const { getBooks } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);


router.post('/add', validateAddBook, bookController.addBook);
router.put('/update/:isbn', validateModifyBook, bookController.modifyBook);
router.get('/search', bookController.searchBooks);
router.delete('/delete/:isbn', bookController.deleteBook);

module.exports = router;
