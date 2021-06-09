const { toArray } = require('lodash');
const mongoDb = require('mongodb');
const MongoConnection = require('../database/connection');

class UserModel {
    constructor(_id, username, email, password, cart, orders) {
        this._id = new mongoDb.ObjectID(_id);
        this.username = username;
        this.email = email;
        this.passsword = password;
        this.cart = cart;
        this.orders = orders;
    }

    save(_id) {
        if (_id) {
            return;
        } else {
            MongoConnection.getDB('shop').collection('user').insertOne(this);
        }
    }

    addToCart(productId) {
        let _productId = new mongoDb.ObjectID(productId);
        if (this.cart.length > 0) {
            let updatedCart = [];

            let existingProductIndex = this.cart.findIndex((item) => {
                return item._id.toString() === _productId.toString();
            });

            updatedCart = [...this.cart];
            if (existingProductIndex > -1) {
                updatedCart[existingProductIndex].qty = updatedCart[existingProductIndex].qty + 1;
            } else {
                updatedCart.push({ _id: _productId, qty: 1 });
            }

            return MongoConnection.getDB('shop')
                .collection('users')
                .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
        } else {
            let newCart = [];

            newCart.push({ _id: _productId, qty: 1 });

            return MongoConnection.getDB('shop')
                .collection('users')
                .updateOne({ _id: this._id }, { $set: { cart: newCart } });
        }
    }

    fetchCart() {
        let productsId = this.cart.map((item) => item._id);

        return MongoConnection.getDB('shop')
            .collection('products')
            .find({ _id: { $in: productsId } })
            .toArray()
            .then((products) => {
                let total_items = 0;
                let total_amount = 0;
                let modifiedProductArray = products.map((product) => {
                    let qty = this.cart.find((cartP) => cartP._id.toString() === product._id.toString()).qty;
                    total_items += qty;
                    total_amount = total_amount + product.price * qty;
                    return { ...product, qty };
                });

                return { total_amount, total_items, products: modifiedProductArray };
            });
    }

    static findById(id) {
        return MongoConnection.getDB('shop')
            .collection('users')
            .findOne({ _id: new mongoDb.ObjectID(id) });
    }
}

module.exports = UserModel;
