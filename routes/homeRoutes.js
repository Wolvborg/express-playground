const router = require('express').Router();
const ProductController = require('../controller/ProductController')
const ErrorController = require('../controller/ErrorController')

router.get('/', (req, res, next) => {
    let pageTitle = 'Express-Playground'

    ProductController.getAllProducts()
        .then(products => {
            res.render('home', {
                pageTitle,
                products
            })
        })
});

router.post('/', ErrorController.sendNotAllowed);

module.exports = router;
