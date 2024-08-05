const path = require('path');
const express = require('express');
const router = express.Router();
const Products = require('../models/product');
const Cart = require('../models/cart');
const fs=require('fs');

const addProductPage = router.get('/add-product', (req, res) => {
    res.render('./admin/addProducts', {
        docTitle: 'Add Product',
        path:'/add-product'
    });
});

const addProduct = router.post('/add-product', (req, res) => {
    const product = new Products(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.save();
    res.redirect('/product-list');
});

const adminpage = router.get('/admin-product', (req, res) => {
    Products.fetchAll(products => {
        res.render('./admin/adminProduct', {
            docTitle: 'Admin Product',
            path: '/admin-product',
            product: products
        });
    });
});

const shopPage = router.get('/product-list', (req, res) => {
    Products.fetchAll(products => {
        res.render('./shop/product-list', {
            docTitle: 'Product List',
            path: '/product-list',
            product: products
        });
    });
});

const cart = router.get('/cart', (req, res) => {
    Cart.getProducts(cart => {
        const productArray = [];
        Products.fetchAll(products => {
            if (!cart || !cart.products.length) {
                res.render('shop/cart', {
                    docTitle: 'Cart',
                    path: '/cart',
                    cart: productArray,
                });
                return;
            }

            for (let prod of products) {
                const cartProductData = cart.products.find(p => p.id === prod.id);
                if (cartProductData) {
                    productArray.push({ productData: prod, qty: cartProductData.qty });
                }
            }

            res.render('shop/cart', {
                docTitle: 'Cart',
                path: '/cart',
                cart: productArray,
            });
        });
    });
});

const index = router.get('/', (req, res) => {
    res.render('./shop/index', {
        docTitle: 'Home',
        path: '/'
    });
});

const productDetails=router.get('/product-details/:productid',(req,res)=>{
    const prodID=req.params.productid;
    Products.findbyId(prodID,product=>{
        res.render('./shop/product-detail',{
            docTitle:'Product Details',
            path:'/product-details',
            prod:product,
        })
    })
    // res.redirect('/');
})

const postCart=router.post('/cart',(req,res)=>{
    console.log(req.body.productId);
    Products.findById(req.body.productId,product=>{
        Cart.addProduct(product.id,product.price);
    })
    res.redirect('/');
})
const editProduct=router.get('/edit-product/:productid', (req, res) => {
    const prodid = req.params.productid;
    Products.findById(prodid, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('./admin/editProduct', {
            docTitle: 'Edit Product',
            path: '/edit-product',
            product: product
        });
    });
});
const postEditProduct=router.post('/edit-product',(req,res)=>{
    const prodid=req.body.productId;
    const p=path.join(__dirname,'..','data','products.json');
    Products.findById(prodid,product=>{
        // console.log(product);
        if(!product){
            res.redirect('/');
        }else{
           fs.readFile(p, (err, fileContent) => {
                if (err) {
                    return res.redirect('/');
                }
                
                let products = JSON.parse(fileContent);
                const existingProductIndex = products.findIndex(prod => prod.id === prodid);
                
                if (existingProductIndex >= 0) {
                    // Update the existing product
                    products[existingProductIndex].title = req.body.title;
                    products[existingProductIndex].imageUrl = req.body.imageUrl;
                    products[existingProductIndex].price = req.body.price;
                    products[existingProductIndex].description = req.body.description;
                    
                    // Write the updated products list back to the file
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        res.redirect('/admin-product');
                    });
                } else {
                    res.redirect('/');
                }
            });
        }
    })
})

const deleteProduct = router.post('/delete/:productid', (req, res) => {
    const p = path.join(__dirname, '..', 'data', 'products.json');
    const prodid = req.params.productid;

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.redirect('/');
        }

        let products = JSON.parse(fileContent);
        let index = products.findIndex(p => p.id === prodid);
        const price=products[index].price;
        if (index !== -1) {
            products.splice(index, 1); // Remove the product
        }

        fs.writeFile(p, JSON.stringify(products), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.redirect('/');
            }
            Cart.deleteProduct(prodid,price);
            res.redirect('/');
        });
    });
});
// const postDeleteProduct=
const pageerror = router.use((req, res) => {
    res.status(404).render('pagenotFound', {
        docTitle: 'Page Not Found',
        path:'/404'})});


module.exports = {
    adminpage,
    addProduct,
    addProductPage,
    shopPage,
    cart,
    index,
    productDetails,
    postCart,
    editProduct,
    postEditProduct,
    deleteProduct,
    pageerror
};
