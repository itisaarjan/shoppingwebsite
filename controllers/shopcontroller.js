const Products=require('../models/product');

// const products=require('../routes/add-product');
const shopController=(req,res)=>{
    // req.sendFile()
    // console.log(products.products);
    

    Products.fetchAll((products)=>{
        res.render('./shop/product-list',{
            product:products,
            docTitle:'Shop',
            path:'product-list'
        })
    })
}
module.exports=shopController;