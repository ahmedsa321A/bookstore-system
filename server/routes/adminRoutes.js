const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// verifytoken middleware can be added here for admin routes

// Check if controller functions exist before routing to prevent crashes
if (adminController.confirmOrder) {
    router.post('/confirm-order', adminController.confirmOrder);
}
if (adminController.getSalesReport) {
    router.get('/sales-report', adminController.getSalesReport);
}

module.exports = router;