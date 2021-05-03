const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('cart',{ products:{}})
});

router.post('/add', (req, res, next) => {
    res.sendStatus(403)
});

module.exports = router;
