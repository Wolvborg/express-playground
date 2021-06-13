const OrderModel = require('../model/orders-model');

function getAllOrders(req, res, next) {
    OrderModel.find({ 'user.userId': req.user._id }).then((orders) => {
        console.log(orders);

        res.render('shop/order', {
            pageTitle: 'Orders',
            orders,
        });
    });
}

function placeOrder(req, res, next) {
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

            const order = new OrderModel({
                user: {
                    username: req.user.username,
                    userId: req.user,
                },
                order: {
                    total_items,
                    total_amount,
                    date: new Date(),
                    products: modifiedProductArray,
                },
            });

            return order.save();
        })
        .then(() => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        });
}

exports.getAllOrders = getAllOrders;
exports.placeOrder = placeOrder;
