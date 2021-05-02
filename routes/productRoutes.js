const router = require('express').Router();

router.get('/', (req, res, next) => {
    pageOption = {
        title: 'Product'
    }
    res.render('product',pageOption)
});

router.post('/', (req, res, next) => {
    res.sendStatus(403)
});

module.exports = router;
