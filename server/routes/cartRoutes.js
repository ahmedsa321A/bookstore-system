const express=require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const verifyToken=require('../middleware/verifyToken');

const router=express.Router();

router.post('/add',verifyToken,addToCart);
router.get('/',verifyToken,getCart);
router.delete('/:cartId',verifyToken,removeFromCart);

module.exports=router