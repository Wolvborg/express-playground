const CartModel = require('../model/cart-model');
const UserModel = require('../model/user-model');

function getCart(req, res, next) {
    CartModel.fetchCart().then((cart) => {
        res.render('shop/cart', { cart });
    });
}

function addCart(req, res, next) {
    let productId = req.body.id;

    req.user.addToCart(productId).then(() => {
        res.redirect('/cart');
    });
}

function deleteCart(req, res, next) {
    let productId = req.body.id;

    CartModel.removeFromCart(productId).then(() => {
        res.redirect('/cart');
    });
}

exports.getCart = getCart;
exports.addCart = addCart;
exports.deleteCart = deleteCart;
