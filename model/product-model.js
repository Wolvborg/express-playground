const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Product', productSchema);

/* const mongoDb = require('mongodb');
const MongoConnection = require('../database/connection');

class ProductModel {
    constructor(title, image, price, description, id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this._id = id ? new mongoDb.ObjectID(id) : null;
    }

    static FETCH_ALL() {
        return MongoConnection.getDB('shop').collection('products').find().toArray();
    }

    static FETCH_BY_ID(prodId) {
        return MongoConnection.getDB('shop')
            .collection('products')
            .find({ _id: new mongoDb.ObjectID(prodId) })
            .next();
    }

    static DELETE_BY_ID(prodId) {
        return MongoConnection.getDB('shop')
            .collection('products')
            .deleteOne({ _id: new mongoDb.ObjectID(prodId) });
    }

    save() {
        if (this._id)
            return MongoConnection.getDB('shop').collection('products').updateOne({ _id: this._id }, { $set: this });
        else return MongoConnection.getDB('shop').collection('products').insertOne(this);
    }
}

module.exports = ProductModel;
 */
