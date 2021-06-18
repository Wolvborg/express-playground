const router = require('express').Router();
const AuthController = require('../controller/AuthController');

router.get('/', AuthController.getLogin);

router.post('/login', AuthController.postLogin);

router.post('/logout', AuthController.postLogout);

module.exports = router;
