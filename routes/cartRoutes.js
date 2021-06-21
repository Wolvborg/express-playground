const router = require('express').Router();
const CartController = require('../controller/CartController');
const IsAuth = require('../middleware/is-auth');

router.get('/', IsAuth, CartController.getCart);

router.post('/add', IsAuth, CartController.addCart);

router.post('/delete', IsAuth, CartController.deleteCart);

module.exports = router;
