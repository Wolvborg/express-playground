const mongodb = require('mongodb')
const MongodbClient = mongodb.MongoClient
const URL = 'mongodb+srv://wolborg:l1JjP572tsxyofpg@cluster0.uj5eu.mongodb.net/?retryWrites=true&w=majority';
let _client;

const MongoConnect = ()=>{
    return MongodbClient.connect(URL,{ useUnifiedTopology: true })
        .then(client => {
            _client = client;
            console.log('Database Connected')
        });
}

const getDB = (databaseName) =>{
    return _client.db(databaseName)
}

exports.MongoConnect = MongoConnect;
exports.getDB = getDB;
