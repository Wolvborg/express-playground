const app = require('./app')
const PORT = port = normalizePort(process.env.PORT || '3000');

app.set('port', PORT);

app.listen(PORT, () => {
    console.log('Listening on ' + PORT)
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

