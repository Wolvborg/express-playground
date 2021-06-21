module.exports = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.isLoggedIn = req.session.isLoggedIn;
    next();
};
