const mongoose = require('mongoose');
const app = require('./app');

const UserModel = require('./model/user-model');

const PORT = (port = normalizePort(process.env.PORT || '4000'));
const URL = 'mongodb://localhost:27017/myDatabase';

mongoose
    .connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('DB Connected');

        app.listen(PORT, () => {
            console.log('Listening on ' + PORT);
            console.log(`CLick on http://localhost:${PORT}/`);
        });
    })
    .catch((err) => {
        console.error(err);
    });

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
