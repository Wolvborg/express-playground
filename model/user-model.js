const MongoConnection = require('../database/connection');
const mongoObjectId = require('mongodb').ObjectID
class UserModel{

    constructor(name, username, email, password, id) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this._id = id ? new mongoObjectId(this._id) : null
    }

    save(){
        MongoConnection.getDB('shop').collection('users').insertOne(this);
    }

    static getUser(userId){
        return MongoConnection.getDB('shop').collection('users').find({_id: new mongoObjectId(this._id)});
    }
}
