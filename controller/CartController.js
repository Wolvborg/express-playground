function getCart(req, res, next) {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then((user) => {
            let products = user.cart.items;
            let total_items = 0;
            let total_amount = 0;
            let modifiedProductArray = products.map((product) => {
                let qty = product.quantity;
                let imageUrl = product.productId.imageUrl;
                let price = product.productId.price;
                let description = product.productId.description;
                let title = product.productId.title;
                let productId = product.productId._id;
                total_items += qty;
                total_amount = total_amount + product.productId.price * qty;
                return { title, imageUrl, productId, price, description, qty };
            });

            res.render('shop/cart', {
                cart: {
                    total_amount,
                    total_items,
                    products: modifiedProductArray,
                },
            });
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

    req.user.removeFromCart(productId).then(() => {
        res.redirect('/cart');
    });
}

exports.getCart = getCart;
exports.addCart = addCart;
exports.deleteCart = deleteCart;
