const ProductModel = require('../model/product-model');

function getAllOrders(req, res, next) {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
    });
}

function placeOrder(req, res, next) {
    req.user.checkout().then(() => {
        ProductModel.FETCH_ALL().then((products) => {
            res.redirect('/');
        });
    });
}

exports.getAllOrders = getAllOrders;
exports.placeOrder = placeOrder;
