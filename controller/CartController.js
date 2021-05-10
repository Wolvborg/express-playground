const CartModel = require('../model/cart-model')

function getCart(req, res, next) {
    CartModel.fetchCart()
        .then(cart => {
            res.render('cart', {cart})
        })
}

function addCart(req, res, next) {
    let productId = req.body.id;

    CartModel.addToCart(productId)
        .then(() => {
            res.redirect('/cart')
        })
}

function deleteCart(req, res, next) {
    let productId = req.body.id;

    CartModel.removeFromCart(productId)
        .then(() => {
            res.redirect('/cart')
        })
}

exports.getCart = getCart;
exports.addCart = addCart;
exports.deleteCart = deleteCart;
