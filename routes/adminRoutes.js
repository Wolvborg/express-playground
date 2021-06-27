const router = require('express').Router();
const AdminController = require('../controller/AdminController');
const IsAuth = require('../middleware/is-auth');

router.get('/', IsAuth, AdminController.getAllProducts);

router.get('/add-product', IsAuth, AdminController.getAddProduct);

router.post('/add-product', IsAuth, AdminController.postAddProduct);

router.get('/edit-product/:id', IsAuth, AdminController.getProductByID);

router.post('/edit-product', IsAuth, AdminController.postEditProduct);

router.post('/delete', IsAuth, AdminController.deleteProduct);

module.exports = router;
