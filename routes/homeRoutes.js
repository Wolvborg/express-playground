const router = require('express').Router();
const ProductController = require('../controller/ProductController')
const ErrorController = require('../controller/ErrorController')

router.get('/',ProductController.getAllProducts)

router.post('/', ErrorController.sendNotAllowed);

module.exports = router;
