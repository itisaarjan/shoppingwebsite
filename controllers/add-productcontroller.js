const path=require('path');
const Products=require('../models/product');



const productpage=(req, res) => {
    console.log(__dirname);
    res.render('./admin/addProducts',{
        docTitle:'Add product',
        path:'/admin-product'
    })
};
const addProduct=(req, res) => {
    // products.push({title:req.body.title});
    const product=new Products(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    product.save();
    res.redirect('/product-list');
};
module.exports={
    productpage,
    addProduct,
}