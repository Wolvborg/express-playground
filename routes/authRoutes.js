const router = require('express').Router();
const AuthController = require('../controller/AuthController');

router.get('/login', AuthController.getLogin);
router.get('/register', AuthController.getRegister);

router.post('/login', AuthController.postLogin);
router.post('/register', AuthController.postRegister);

router.post('/logout', AuthController.postLogout);

module.exports = router;
