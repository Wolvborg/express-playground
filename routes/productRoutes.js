const router = require('express').Router();
const ProductController = require('../controller/ProductController');
const ErrorController = require('../controller/ErrorController');

router.get('/:id', ProductController.getProductByID);

router.post('/', ErrorController.sendNotAllowed);

module.exports = router;
