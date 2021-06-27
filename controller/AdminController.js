const ProductModel = require('../model/product-model');

function getAllProducts(req, res, next) {
    ProductModel.find().then((products) => {
        res.render('admin/admin', {
            pageTitle: 'Admin Express Playground',
            products,
        });
    });
}

function getAddProduct(req, res, next) {
    res.render('admin/product-form', {
        pageTitle: 'Add Item',
        product: {},
        mode: 'ADD',
    });
}

function postAddProduct(req, res, next) {
    let productModel = new ProductModel({
        title: req.body.title,
        imageUrl: req.body.image,
        price: req.body.price,
        description: req.body.description,
        userId: req.user,
    });

    productModel
        .save()
        .then(() => {
            res.redirect('/admin');
        })
        .catch((error) => console.error(error));
}

function getProductByID(req, res, next) {
    let productId = req.params.id;
    ProductModel.findById(productId).then((product) => {
        res.render('admin/product-form', {
            pageTitle: 'Edit Item',
            product,
            mode: 'EDIT',
        });
    });
}

function postEditProduct(req, res, next) {
    ProductModel.findById(req.body.id)
        .then((product) => {
            product.title = req.body.title;
            product.imageUrl = req.body.image;
            product.price = req.body.price;
            product.description = req.body.description;

            return product.save();
        })
        .then(() => {
            res.redirect('/admin');
        });
}

function deleteProduct(req, res, next) {
    let id = req.body.id;

    ProductModel.findByIdAndRemove(id).then(() => {
        res.redirect('/admin');
    });
}

exports.getAllProducts = getAllProducts;
exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProductByID = getProductByID;
exports.postEditProduct = postEditProduct;
exports.deleteProduct = deleteProduct;
