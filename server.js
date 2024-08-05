const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Import routes
const controller = require('./controllers/maincontroller');

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Route handling
app.use(controller.index);
app.use(controller.addProductPage);
app.use(controller.addProduct);
app.use(controller.cart);
app.use(controller.adminpage);
app.use(controller.postCart);
app.use(controller.productDetails);
app.use(controller.editProduct);
app.use(controller.postEditProduct);
app.use(controller.deleteProduct);
app.use(controller.shopPage);

// 404 Page not found handler
app.use(controller.pageerror);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
