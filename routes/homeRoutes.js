const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('This Home')
});

router.post('/', (req, res, next) => {
    res.sendStatus(403)
});

module.exports = router;
