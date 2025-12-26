const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// verifytoken middleware can be added here for admin routes

router.post('/confirm-order', adminController.confirmOrder);
router.get('/sales-report', adminController.getSalesReport);


module.exports = router;