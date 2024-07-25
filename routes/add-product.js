const express = require('express');

const app = express();

const addProductController=require('../controllers/add-productcontroller');
const products=addProductController.products;

const router = express.Router();

app.set('view engine','ejs');
app.set('views','views');



router.get('/add-product',addProductController.productpage );

router.post('/add-product',addProductController.addProduct );

exports.routes = router;
exports.product = products;

// console.log(path.join(__dirname,'..', 'addProducts.html'));