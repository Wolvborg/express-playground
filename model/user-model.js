const mongoDb = require("mongodb");
const MongoConnection = require("../database/connection");

class UserModel {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.passsword = password;
  }

  save() {
    MongoConnection.getDB("shop").collection("user").insertOne(this);
  }

  static findById(id) {
    return MongoConnection.getDB("shop")
      .collection("users")
      .findOne({ _id: new mongoDb.ObjectID(id) });
  }
}

module.exports = UserModel;
