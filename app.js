const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const app = new express();

app.use(morgan('Accessing :url with :method method. Sent status :status in :response-time ms'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const productRoutes = require('./routes/productRoutes'),
    cartRoutes = require('./routes/cartRoutes'),
    adminRoutes = require('./routes/adminRoutes'),
    homeRoute = require('./routes/homeRoutes'),
    errorRoute = require('./routes/errorRoute')

app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);
app.use(homeRoute);
app.use(errorRoute);

module.exports = app;
