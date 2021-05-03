const router = require('express').Router();
const ProductController = require('../controller/ProductController')
const ErrorController = require('../controller/ErrorController')

router.get('/:id', (req, res, next) => {
    let productId = req.params.id;

    ProductController.getProductByID(productId)
        .then(product => {
            if(product){
                res.render('product', {
                    product
                })
            }
            else{
                res.render('error',{message:'Product doesn\'t exist'});
            }
        })
});

router.post('/', ErrorController.sendNotAllowed);

module.exports = router;
