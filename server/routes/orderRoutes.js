const express = require('express');
const { checkout, getCustomerOrderHistory } = require('../controllers/orderController');
const {
    getAllCustomerOrders,
    updateCustomerOrderStatus,
    getLowStockBooks,
    getAllPublisherOrders,
    placePublisherOrder,
    confirmPublisherOrder
} = require('../controllers/orderControllerAdmin');

const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/checkout', verifyToken, checkout);
router.get('/getCustomerOrderHistory', verifyToken, getCustomerOrderHistory);

// Admin Routes
router.get('/admin/all', verifyToken, getAllCustomerOrders);
router.put('/admin/status/:id', verifyToken, updateCustomerOrderStatus);
router.get('/admin/low-stock', verifyToken, getLowStockBooks);
router.get('/admin/publisher-orders', verifyToken, getAllPublisherOrders);
router.post('/admin/publisher-order', verifyToken, placePublisherOrder);
router.put('/admin/publisher-order/:id/confirm', verifyToken, confirmPublisherOrder);

// Admin Routes
router.get('/admin/all', verifyToken, getAllCustomerOrders);
router.put('/admin/status/:id', verifyToken, updateCustomerOrderStatus);
router.get('/admin/low-stock', verifyToken, getLowStockBooks);
router.get('/admin/publisher-orders', verifyToken, getAllPublisherOrders);
router.post('/admin/publisher-order', verifyToken, placePublisherOrder);
router.put('/admin/publisher-order/:id/confirm', verifyToken, confirmPublisherOrder);

// Admin Routes
router.get('/admin/all', verifyToken, getAllCustomerOrders);
router.put('/admin/status/:id', verifyToken, updateCustomerOrderStatus);
router.get('/admin/low-stock', verifyToken, getLowStockBooks);
router.get('/admin/publisher-orders', verifyToken, getAllPublisherOrders);
router.post('/admin/publisher-order', verifyToken, placePublisherOrder);
router.put('/admin/publisher-order/:id/confirm', verifyToken, confirmPublisherOrder);

module.exports = router;