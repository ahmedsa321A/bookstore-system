const express = require('express');
const { checkout, getCustomerOrderHistory } = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/checkout', verifyToken, checkout);
router.get('/getCustomerOrderHistory', verifyToken, getCustomerOrderHistory);



module.exports = router;