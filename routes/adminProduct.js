const express = require('express');
const router=express.Router();
const path=require('path');

const Product=require(path.join(__dirname,'..','models','product'));


router.get('/admin-product',(req,res)=>{
    Product.fetchAll(products=>{
        res.render('./admin/adminProduct',{
            docTitle:'Admin Product',
            path:'/admin-product',
            product:products})
    })
})
module.exports=router