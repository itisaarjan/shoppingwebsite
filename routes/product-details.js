const express=require('express');
const path = require('path');
const app=express();
const router=express.Router();

router.get('/product-details',(req,res)=>{
    res.render('./shop/product-detail',{
        docTitle:'Product Details',
    path:'/product-details',
    });
});
module.exports=router;