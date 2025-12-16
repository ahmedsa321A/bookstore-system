const express = require('express');
const { getUser, updateUser, getMe } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken'); 

const router = express.Router();
router.get('/me', verifyToken, getMe);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);

module.exports = router;