const path=require('path');
const fs=require('fs');

const p=path.join(__dirname,'../data','cart.json');

module.exports=class cart{  
    static addProduct(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            let cart={products:[],totalPrice:0};
            if(!err && fileContent.length>0){
                cart=JSON.parse(fileContent);
            }
            const existingProductIndex=cart.products.findIndex(prod=>prod.id===id);
        const existingProduct=cart.products[existingProductIndex];
        let updatedProduct;
        if(existingProduct){
            updatedProduct={...existingProduct};
            updatedProduct.qty=updatedProduct.qty+1;
            cart.products=[...cart.products];
            cart.products[existingProductIndex]=updatedProduct;
        }else{
            updatedProduct={id:id,qty:1};
            cart.products=[...cart.products,updatedProduct];
        }
        cart.totalPrice=(Number(cart.totalPrice)+Number(productPrice)).toString();
        fs.writeFile(p,JSON.stringify(cart),(err)=>{
            console.log(err);
        })
        })
        
    }
    static getProducts(cb){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                cb(null);
            }else{
                cb(JSON.parse(fileContent));
            }
        })
    }
    static deleteProduct(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                return;
            }
            const currentCart=JSON.parse(fileContent);
            console.log(currentCart);
            const index=currentCart.products.findIndex(prod=>prod.id===id);
            const prodQty=currentCart.products[index].qty;
            const totalPrice=currentCart.totalPrice;
            currentCart.totalPrice=totalPrice-productPrice*prodQty;
            currentCart.products.splice(index,1);
            fs.writeFile(p,JSON.stringify(currentCart),err=>{
                if(err){
                    console.log("Error while writing in the file");
                }
            })


        })
    }
    
}