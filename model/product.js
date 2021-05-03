const fs = require('fs');
const path = require('path');
const set = require('lodash/set');

const $FILE = path.join(
    require.main.path,
    'data',
    'products.json'
);

function getDataFromFile(cb) {
    fs.readFile($FILE, (err, data) => {
        if (err) cb(null)
        else cb(data)
    })
}

function putDataIntoFile(data, cb) {
    fs.writeFile($FILE, data, cb)
}

function $GET_PRODUCT_ID() {
    return Math.round(Math.random() * 10000)
}

module.exports = {
    fetchAllProducts: function () {
        return new Promise((resolve, reject) => {
            getDataFromFile(data => {
                if (data) resolve(JSON.parse(data))
                else reject('File Not Present')
            })
        })
    },

    fetchProductById: function (id) {
        return new Promise((resolve, reject) => {
            getDataFromFile(data => {
                if (data) {
                    let products = JSON.parse(data);
                    resolve(products.find(product => product.id === parseInt(id)))
                } else reject('File Not Present')
            })
        })
    },

    insertProduct: function (productData) {
        return new Promise((resolve, reject) => {
            getDataFromFile(data => {
                if (data) {
                    let products = JSON.parse(data);
                    set(productData, 'price', parseInt(productData.price))
                    set(productData, 'id', $GET_PRODUCT_ID())
                    products.push(productData)
                    putDataIntoFile(JSON.stringify(products), (err) => {
                        if (err) reject(err)
                        else resolve()
                    })
                } else reject('File Not Present')
            })
        })
    },

    editProduct: function (productData) {
        return new Promise((resolve, reject) => {
            getDataFromFile(data => {
                if (data) {
                    let products = JSON.parse(data);
                    set(productData, 'price', parseInt(productData.price))
                    set(productData, 'id', parseInt(productData.id))
                    let index = products.findIndex(dbProduct => dbProduct.id === parseInt(productData.id));
                    products.splice(index, 1, productData)
                    putDataIntoFile(JSON.stringify(products), (err) => {
                        if (err) reject(err)
                        else resolve()
                    })
                } else reject('File Not Present')
            })
        })
    },

    deleteProduct: function (id) {
        return new Promise((resolve, reject) => {
            getDataFromFile(data => {
                if (data) {
                    let products = JSON.parse(data);
                    let index = products.findIndex(dbProduct => dbProduct.id === parseInt(id));
                    products.splice(index, 1)
                    putDataIntoFile(JSON.stringify(products), (err) => {
                        if (err) reject(err)
                        else resolve()
                    })
                } else reject('File Not Present')
            })
        })
    }
}
