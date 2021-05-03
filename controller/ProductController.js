const ProductModel = require('../model/product')

function getAllProducts(req, res, next) {
    ProductModel.fetchAllProducts()
        .then(products => {
        res.render('home', {
            pageTitle: 'Express Playground',
            products
        })
    })
}

function getProductByID(req, res, next) {

    let productId = req.params.id;

    ProductModel.fetchProductById(productId)
        .then(product => {
            if(product){
                res.render('product', {
                    product
                })
            }
            else{
                res.render('error',{message:'Product doesn\'t exist'});
            }
        })
}

exports.getAllProducts = getAllProducts;
exports.getProductByID = getProductByID;
