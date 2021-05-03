const ProductModel = require('../model/product')


function getAllProducts(req, res, next) {
    ProductModel.fetchAllProducts()
        .then(products => {
            res.render('admin', {
                pageTitle: 'Admin Express Playground',
                products
            })
        })
}

function getAddProduct(req, res, next) {
    res.render('product-form', {
        pageTitle: 'Add Item',
        product: {},
        mode: 'ADD'
    })
}

function postAddProduct(req, res, next) {
    let product = req.body

    ProductModel.insertProduct(product)
        .then(() => {
            res.redirect('/admin');
        })

}

function getProductByID(req, res, next) {

    let productId = req.params.id
    ProductModel.fetchProductById(productId)
        .then(product => {
            res.render('product-form', {
                pageTitle:'Edit Item',
                product,
                mode: 'EDIT'
            })
        })
}

function postEditProduct(req, res, next) {
    let product = req.body

    ProductModel.editProduct(product)
        .then(() => {
            res.redirect('/admin');
        })
}

function deleteProduct(req, res, next) {
    let id = req.body.id

    ProductModel.deleteProduct(id)
        .then(() => {
            res.redirect('/admin');
        })
}

exports.getAllProducts = getAllProducts;
exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProductByID = getProductByID;
exports.postEditProduct = postEditProduct;
exports.deleteProduct = deleteProduct;

