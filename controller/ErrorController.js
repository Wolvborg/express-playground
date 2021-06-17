function render404(req, res, next) {
    res.render('error/error', {
        title: '404 Not Found',
        message: "I guess you have reached where you shouldn't be. :(",
        isLoggedIn: req.session.isLoggedIn,
    });
}

function sendNotAllowed(req, res, next) {
    res.sendStatus(405);
}

exports.sendNotAllowed = sendNotAllowed;
exports.render404 = render404;
