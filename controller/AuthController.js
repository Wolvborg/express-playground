exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login');
};

exports.postLogin = (req, res, next) => {
    UserModel.findById('60c5bc7fb2e6912d304d4aea').then((user) => {
        req.session.user = user;
        req.session.isLoggedIn = true;

        res.redirect('/admin');
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) console.error(err);
        res.redirect('/');
    });
};
