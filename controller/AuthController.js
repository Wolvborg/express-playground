exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login');
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;

    res.redirect('/admin');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) console.error(err);
        res.redirect('/');
    });
};
