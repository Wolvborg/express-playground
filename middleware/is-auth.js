module.exports = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
};
