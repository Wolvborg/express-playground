const ProductModel = require('../model/product-model');

function getAllProducts(req, res, next) {
    console.log(req.session.isLoggedIn);
    ProductModel.find().then((products) => {
        res.render('shop/home', {
            pageTitle: 'Express Playground',
            products,
            isLoggedIn: req.session.isLoggedIn,
        });
    });
}

function getProductByID(req, res, next) {
    let productId = req.params.id;

    ProductModel.findById(productId).then((product) => {
        if (product) {
            res.render('shop/product', {
                pageTitle: product.title,
                product,
                isLoggedIn: req.session.isLoggedIn,
            });
        } else {
            res.render('error/error', { message: "Product doesn't exist" });
        }
    });
}

exports.getAllProducts = getAllProducts;
exports.getProductByID = getProductByID;
