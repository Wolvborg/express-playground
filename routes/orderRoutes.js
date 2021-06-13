const router = require('express').Router();
const OrderController = require('../controller/OrderController');

router.get('/', OrderController.getAllOrders);

router.post('/', OrderController.placeOrder);

module.exports = router;
