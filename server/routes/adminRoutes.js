const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/sales/last-month', verifyToken, verifyAdmin, reportsController.getSalesLastMonth);

router.get('/sales/date', verifyToken, verifyAdmin, reportsController.getSalesByDate);

router.get('/top-customers', verifyToken, verifyAdmin, reportsController.getTopCustomers);

router.get('/top-books', verifyToken, verifyAdmin, reportsController.getTopSellingBooks);

router.get('/replenishment/:isbn', verifyToken, verifyAdmin, reportsController.getBookReplenishmentStats);

module.exports = router;