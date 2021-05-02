const router = require('express').Router();
const ProductController = require('../controller/ProductController')
const ErrorController = require('../controller/ErrorController')

router.get('/', (req, res, next) => {
    let pageTitle = 'Admin Express-Playground'

    ProductController.getAllProducts()
        .then(products => {
            res.render('admin', {
                pageTitle,
                products
            })
        })
});



router.get('/add-product', (req, res, next) => {
    let pageTitle = 'Add Item';
    let product = {};

    res.render('product-form', {
        pageTitle,
        product,
        mode: 'ADD'
    })
});

router.post('/add-product', (req, res, next) => {
    let product = req.body

    ProductController.addProduct(product)
        .then(() => {
            res.redirect('/admin');
        })

});



router.get('/edit-product/:id', (req, res, next) => {
    let pageTitle = 'Edit Item';
    let productId = req.params.id;

    ProductController.getProductByID(productId)
        .then(product => {
            res.render('product-form', {
                pageTitle,
                product,
                mode: 'EDIT'
            })
        })
});

router.post('/edit-product', (req, res, next) => {
    let product = req.body

    ProductController.editProduct(product)
        .then(() => {
            res.redirect('/admin');
        })

});



router.post('/delete', (req, res, next) => {
    let id = req.body.id

    ProductController.deleteProduct(id)
        .then(() => {
            res.redirect('/admin');
        })

});

router.post('/', ErrorController.sendNotAllowed);

module.exports = router;
