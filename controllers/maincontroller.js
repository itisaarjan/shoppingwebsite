const path = require('path');
const express = require('express');
const router = express.Router();
const Products = require('../models/product');

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
    res.render('shop/cart', {
        docTitle: 'Cart',
        path: '/cart'
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
    console.log(req.body);
    Products.findbyId(req.body.productid,product=>{
        res.render('shop/cart',{
            docTitle:'Cart',
            path:'/cart',
            product:product
        })
    })
})

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
    pageerror
};
