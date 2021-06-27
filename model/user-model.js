const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
});

userSchema.methods.addToCart = function (productId) {
    let existingProductIndex = this.cart.items.findIndex((item) => {
        return item.productId.toString() === productId;
    });

    let updatedCartItems = [...this.cart.items];
    if (existingProductIndex > -1) {
        updatedCartItems[existingProductIndex].quantity =
            updatedCartItems[existingProductIndex].quantity + 1;
    } else {
        updatedCartItems.push({ productId: productId, quantity: 1 });
    }

    this.cart = { items: updatedCartItems };

    return this.save();
};

userSchema.methods.clearCart = function (productId) {
    this.cart = { items: [] };
    return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
    let updatedCartItems = this.cart.items.filter((item) => {
        return item.productId.toString() !== productId;
    });

    this.cart.items = updatedCartItems;

    return this.save();
};

module.exports = mongoose.model('User', userSchema);
