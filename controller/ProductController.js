const ProductModel = require('../model/product-model')

function getAllProducts(req, res, next) {
    ProductModel.FETCH_ALL()
        .then(products => {
            res.render('shop/home', {
                pageTitle: 'Express Playground',
                products
            })
        })
}

function getProductByID(req, res, next) {
    let productId = req.params.id;

    ProductModel.FETCH_BY_ID(productId)
        .then(product => {
            if (product) {
                res.render('shop/product', {
                    product
                })
            } else {
                res.render('error/error', {message: 'Product doesn\'t exist'});
            }
        })
}

exports.getAllProducts = getAllProducts;
exports.getProductByID = getProductByID;
