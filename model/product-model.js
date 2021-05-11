const mongoDb = require('mongodb')
const MongoConnection = require('../database/connection')


class ProductModel {
    constructor(title, image, price, description, id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this._id = id ? new mongoDb.ObjectID(id) : null;
    }

    static fetchAll() {
        return MongoConnection.getDB('shop').collection('products').find().toArray();
    }

    static fetchByID(prodId) {
        return MongoConnection.getDB('shop').collection('products').find({_id: new mongoDb.ObjectID(prodId)}).next();
    }

    static deleteByID(prodId) {
        return MongoConnection.getDB('shop').collection('products').deleteOne({_id: new mongoDb.ObjectID(prodId)});
    }

    save() {
        if(this._id)
            return MongoConnection.getDB('shop').collection('products').updateOne({_id: this._id}, {$set: this})
        else return MongoConnection.getDB('shop').collection('products').insertOne(this)
    }
}

module.exports = ProductModel;
