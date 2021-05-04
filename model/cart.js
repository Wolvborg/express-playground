const fs = require('fs');
const path = require('path');
const set = require('lodash/set');

const $CART_FILE = path.join(
    require.main.path,
    'data',
    'cart.json'
);

const $PRODUCT_FILE = path.join(
    require.main.path,
    'data',
    'products.json'
);

function getDataFromFile(file, cb) {
    fs.readFile(file, (err, data) => {
        if (err) cb(null)
        else cb(data)
    })
}

function putDataIntoFile(file,data, cb) {
    fs.writeFile(file, data, cb)
}

module.exports = {
    fetchCart: function () {
        return new Promise((resolve, reject) => {
            getDataFromFile($CART_FILE, data => {
                if (data) {
                    let cartObj = JSON.parse(data);
                    if (Object.keys(cartObj).length)
                        resolve(cartObj)
                    else {
                        set(cartObj, 'total_items', 0);
                        resolve(cartObj);
                    }
                } else reject('No File Present')
            })
        })
    },

    addToCart: function (id) {
        let productId = parseInt(id)
        return new Promise((resolve, reject) => {
            getDataFromFile($CART_FILE, cart_file_data => {
                if (cart_file_data) {
                    let cartObj = JSON.parse(cart_file_data);
                    if (Object.keys(cartObj).length === 0) {
                        getDataFromFile($PRODUCT_FILE, product_file_data => {
                            let products = JSON.parse(product_file_data)
                            let product = products.find(product => product.id === productId);
                            set(cartObj, 'products[0]', product)
                            set(cartObj, 'products[0].qty', 1)
                            set(cartObj, 'total_items', 1)
                            set(cartObj, 'total_amount', product.price)
                            putDataIntoFile($CART_FILE,JSON.stringify(cartObj), (err) => {
                                if (err) reject(err)
                                else resolve()
                            })
                        })
                    } else {
                        getDataFromFile($PRODUCT_FILE, product_file_data => {
                            let existingProductIndex = cartObj.products.findIndex(product=> product.id === productId);
                            if (existingProductIndex > -1) {
                                let existingProduct = cartObj.products[existingProductIndex];
                                set(cartObj, ['products', `${existingProductIndex}`, 'qty'], existingProduct.qty +1)
                                set(cartObj, 'total_items', ++cartObj.total_items)
                                set(cartObj, 'total_amount', existingProductIndex.price * existingProduct.qty)
                            } else {
                                let products = JSON.parse(product_file_data)
                                let product = products.find(product => product.id === productId);
                                set(cartObj, ['products', `${cartObj.products.length}`], product)
                                set(cartObj, ['products', `${cartObj.products.length}`, 'qty'], 1)
                                set(cartObj, 'total_items', 1)
                                set(cartObj, 'total_amount', product.price)
                            }
                            putDataIntoFile($CART_FILE,JSON.stringify(cartObj), (err) => {
                                if (err) reject(err)
                                else resolve()
                            })
                        })
                    }
                } else reject('No File Present')
            })
        })

    },

    removeFromCart: function (productId) {

    },
}
