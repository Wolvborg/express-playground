const bcrypt = require('bcryptjs');
const UserModel = require('../model/user-model');

exports.getLogin = (req, res, next) => {
    res.render('auth/login');
};

exports.getRegister = (req, res, next) => {
    res.render('auth/register');
};

exports.postLogin = (req, res, next) => {
    let { username, password } = req.body;

    UserModel.findOne({ username: username }).then((user) => {
        if (!user) {
            res.redirect('/auth/register');
        } else {
            bcrypt.compare(password, user.password).then((doMatch) => {
                if (doMatch) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            });
        }
    });
};

exports.postRegister = (req, res, next) => {
    let { username, password } = req.body;

    UserModel.findOne({ username: username }).then((user) => {
        if (user) {
            res.redirect('/auth/login');
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hashPassword) {
                    // Store hash in your password DB.

                    if (!err) {
                        new UserModel({
                            username,
                            password: hashPassword,
                            cart: { items: [] },
                        }).save();

                        res.redirect('/auth/login');
                    }
                });
            });
        }
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) console.error(err);
        res.redirect('/');
    });
};
