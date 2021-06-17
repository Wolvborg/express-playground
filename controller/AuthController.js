exports.getLogin = (req, res, next) => {
    req.session.isLogged = true;
    res.render('auth/login');
};

exports.postLogin = (req, res, next) => {
    next();
};
