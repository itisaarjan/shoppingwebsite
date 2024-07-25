const fs = require('fs');
const path = require('path');
let id=0;
let products = [];

module.exports = class Product {
    constructor(title,imageUrl,price,description) {
        this.title = title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;
    }

    save() {
        this.id=Math.random().toString();
        const p = path.join(__dirname, '..', 'data', 'products.json');

        fs.readFile(p, (err, filecontent) => {
            if (!err && filecontent.length > 0) {
                products = JSON.parse(filecontent);
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
        fs.readFile(p, (err, filecontent) => {
            if (err || filecontent.length === 0) {
                cb([]);
            } else {
                let content;
                try {
                    content = JSON.parse(filecontent);
                } catch (parseError) {
                    content = [];
                }
                cb(content);
            }
        });
    }
    static findbyId(id,cb){
        this.fetchAll(products=>{
            const product=products.find(p=>p.id===id);
            cb(product);
        })
    }
}
