function sendNotAllowed(req, res, next) {
    res.sendStatus(405)
}

exports.sendNotAllowed = sendNotAllowed;
