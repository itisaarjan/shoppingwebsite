// const exp = require('constants');
const express = require('express');
const app=express();
const path=require('path');
const shopController=require('../controllers/shopcontroller');


app.set('view engine','ejs');
app.set('views','views');

const router = express.Router();

router.get('/product-list',shopController);

module.exports=router;