const fs = require('fs');
const path = require('path');
const set = require('lodash/set');

const $FILE = path.join(
    require.main.path,
    'data',
    'products.json'
);

const $GET_PRODUCT_ID = function (){
    return Math.round(Math.random() * 10000)
}

function getAllProducts() {
    return new Promise((resolve, reject) => {
        fs.readFile($FILE, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(JSON.parse(data))
        })
    })
}

function addProduct(product) {
    return new Promise((resolve, reject) => {
        fs.readFile($FILE, (err, data) => {
            if (err)
                reject(err)
            else {
                let products = JSON.parse(data);
                set(product, 'price', parseInt(product.price))
                set(product, 'id', $GET_PRODUCT_ID())
                products.push(product)
                fs.writeFile($FILE, JSON.stringify(products), (err) =>{
                    if(err) reject(err)
                    else resolve()
                } )
            }
        })
    })
}

function getProductByID(productId) {
    return new Promise((resolve, reject) => {
        fs.readFile($FILE, (err, data) => {
            if (err)
                reject(err)
            else {
                let products = JSON.parse(data);
                resolve(products.find(product => product.id === parseInt(productId)))
            }
        })
    })
}

function editProduct(product) {
    return new Promise((resolve, reject) => {
        fs.readFile($FILE, (err, data) => {
            if (err)
                reject(err)
            else {
                let products = JSON.parse(data);
                let index = products.findIndex(dbProduct => dbProduct.id === parseInt(product.id));
                set(product, 'price', parseInt(product.price))
                set(product, 'id', parseInt(product.id))
                products.splice(index, 1, product)
                fs.writeFile($FILE, JSON.stringify(products), (err) =>{
                    if(err) reject(err)
                    else resolve()
                } )
            }
        })
    })
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        fs.readFile($FILE, (err, data) => {
            if (err)
                reject(err)
            else {
                let products = JSON.parse(data);
                let index = products.findIndex(dbProduct => dbProduct.id === parseInt(id));
                products.splice(index, 1)
                fs.writeFile($FILE, JSON.stringify(products), (err) =>{
                    if(err) reject(err)
                    else resolve()
                } )
            }
        })
    })
}


exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
exports.getProductByID = getProductByID;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
