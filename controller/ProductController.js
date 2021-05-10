const ProductModel = require('../model/product-model')

function getAllProducts(req, res, next) {
    ProductModel.fetchAll()
        .then(products => {
            console.log(products)
            res.render('home', {
                pageTitle: 'Express Playground',
                products
            })
        })
}

function getProductByID(req, res, next) {
    let productId = req.params.id;

    ProductModel.fetchByID(productId)
        .then(product => {
            if (product) {
                res.render('product', {
                    product
                })
            } else {
                res.render('error', {message: 'Product doesn\'t exist'});
            }
        })
}

exports.getAllProducts = getAllProducts;
exports.getProductByID = getProductByID;
