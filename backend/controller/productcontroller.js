const Product = require("../modals/Product");

exports.createProduct = async(req,res)=>{
try{
const {name,description,price,image,stock,category} = req.body; //getting fields from deconstructing method
//chekhing if product is already created 
const exsited = await Product.findOne({name});
if(exsited){
    return res.status(400).json({success:false,message:"product is already existed"});  
}
//if not crated new product
 let product = new Product({
          name,
          description,
          price,
          stock,
          image,
          category

    });
    await product.save();
    res.status(200).json({success:true,message:"product successfully created ",product});

}
catch(err){
    res.status(500).json({success:false, message:"internal sever error",err});
}

}
exports.getProduct = async(req,res)=>{
    try{
     const products = await Product.find();
     res.status(200).json({sucess:true,message:"here your all products",products});
    }
    catch(err){
        res.status(400).json({success:false,message:"internal server error",err});
    }
}

//updating user products
exports.updateProduct = async(req,res)=>{
    try{
    const update = Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    
    }
    catch(err){
        res.status(500).json({success:false,message:"internal server error",err})
    }
}
//deleting or removing user Proudct
exports.removeProduct = async(req,res)=>{
    try{
     const remove = Product.findByIdAndUpdate(req.params.id,);
     res.status(200).json({success:true,message:"your product successfully got remove"});
    }
    catch(err){
        res.status(500).json({success:false,message:"getting error in removing product",err})
    }
res.send("your product is removed");
}