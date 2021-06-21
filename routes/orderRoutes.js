const router = require('express').Router();
const OrderController = require('../controller/OrderController');
const IsAuth = require('../middleware/is-auth');

router.get('/', IsAuth, OrderController.getAllOrders);

router.post('/', IsAuth, OrderController.placeOrder);

module.exports = router;
