const route =  (req, res, next) => {
    res.render('error',{ title: '404 Not Found', message: 'I gues you have reached where you shouldn\'t be. :('})
};

module.exports = route;
