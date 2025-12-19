const express = require('express');
const { checkout } = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/checkout', verifyToken, checkout);

module.exports = router;