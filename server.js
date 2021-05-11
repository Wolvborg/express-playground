const app = require('./app');
const MongoConnection = require('./database/connection')
const PORT = port = normalizePort(process.env.PORT || '4000');

MongoConnection.MongoConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Listening on ' + PORT);
        })
    }).catch(err => {
        console.error(err)
    })

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

