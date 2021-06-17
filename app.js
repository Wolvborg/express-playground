const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const UserModel = require('./model/user-model');
const session = require('express-session');

const app = new express();

app.use(
    morgan(
        'Accessing :url with :method method. Sent status code :status in :response-time ms'
    )
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'WOLBORG',
        resave: false,
        saveUninitialized: false,
    })
);
app.set('views', './views');
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

const productRoutes = require('./routes/productRoutes'),
    cartRoutes = require('./routes/cartRoutes'),
    orderRoutes = require('./routes/orderRoutes'),
    adminRoutes = require('./routes/adminRoutes'),
    homeRoute = require('./routes/homeRoutes'),
    errorRoutes = require('./routes/errorRoutes'),
    authRoutes = require('./routes/authRoutes');

app.use((req, res, next) => {
    UserModel.findById('60c5bc7fb2e6912d304d4aea')
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.error(err);
            next();
        });
});

app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use(homeRoute);
app.use(errorRoutes);

module.exports = app;
