const Product = require("../modals/Product");

exports.addProduct = async(req,res)=>{
    try{
    const{image,description,name,price,discount,stock} = req.body;

    const draftProduct = new Product({})
    }
    catch(err){
        res.status(500).json({success:false,message:"internal sever error",error:err.message});
    }
} 