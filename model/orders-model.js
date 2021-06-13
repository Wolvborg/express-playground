const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order: {
        products: [
            {
                type: Object,
                required: true,
            },
        ],
        total_amount: {
            type: Number,
            required: true,
        },
        total_items: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    user: {
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
});

module.exports = mongoose.model('Order', OrderSchema);
