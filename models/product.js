const fs = require('fs');
const path = require('path');
const cart=require('./cart');
let products = [];

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        const p = path.join(__dirname, '..', 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {
            if (!err && fileContent.length > 0) {
                products = JSON.parse(fileContent);
            } else {
                products = [];
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(__dirname, '..', 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err || fileContent.length === 0) {
                cb([]);
            } else {
                let content;
                try {
                    content = JSON.parse(fileContent);
                } catch (parseError) {
                    content = [];
                }
                cb(content);
            }
        });
    }

    static findById(id, cb) {
        this.fetchAll(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
    static deleteById(id){
        this.fetchAll(prod=>{
            const product=prod.find(prod=>prod.id===id);
            const updatedProducts=prod.find(prod=>prod.id!=id);
            fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
                if(!err){
                    cart.deleteProduct(id,product.price);
                }
            })
        })
    }
}
