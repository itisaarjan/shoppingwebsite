const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const pageerror=require('./controllers/pagenotFound');

app.set('view engine','ejs');
app.set('views','views');


// Import routes
const home=require('./routes/index');
const addProductRoutes = require('./routes/add-product.js');
const shopRoutes = require('./routes/shop.js');
const productDetails = require('./routes/product-details.js');
const cart=require('./routes/cart');
const adminProduct=require('./routes/adminProduct');

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Route handling
app.use(home);
app.use(addProductRoutes.routes);
app.use(cart);
app.use(adminProduct);
app.use(productDetails);
app.use(shopRoutes);

// 404 Page not found handler
app.use(pageerror.err);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
