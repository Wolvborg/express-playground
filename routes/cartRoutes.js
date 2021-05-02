const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('cart',{ title: 'Cart', message: 'Bulma'})
});

router.post('/', (req, res, next) => {
    res.sendStatus(403)
});

module.exports = router;
