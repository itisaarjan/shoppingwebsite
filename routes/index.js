const express = require('express');
const path=require('path');
const router=express.Router();
const app=express();


router.get('/',(req,res)=>{
    res.render('./shop/index',{
        docTitle:'Home',
        path:'/',
    });
})
module.exports=router;

