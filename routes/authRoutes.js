const router = require('express').Router();
const AuthController = require('../controller/AuthController');

router.get('/', AuthController.getLogin);

router.post('/', AuthController.postLogin);

module.exports = router;
