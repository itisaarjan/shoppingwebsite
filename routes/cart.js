const express = require('express');
const router = express.Router();

router.get('/cart', (req, res) => {
    res.render('shop/cart',{
        docTitle:'Cart',
        path:'/cart'
    })
});

module.exports = router;