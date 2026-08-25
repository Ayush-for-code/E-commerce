const Product = require("../modals/Product");
const fs = require("fs/promises");
const cloudniary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  try {
     console.log("BODY:", req.body);
      console.log("file",req.file);
    const { name, description, price, stock, category,discount} = req.body; //getting fields from deconstructing method

//chekcing for image file
if(!req.file){
 return res.status(404).json({success:false,message:"file not found"});
}

    //chekhing if product is already created
    const exsited = await Product.findOne({ name });
    if (exsited) {
      return res
        .status(400)
        .json({ success: false, message: "product is already existed" });
    }

    const result = await cloudniary.uploader.upload(
      req.file.path,{
        folder: "ecommerce/product"
      }
    )

    //if not crated new product
    let product = new Product({
      name,
      description,
      price,
      stock,
       image:result.secure_url,
       imagePublicId:result.public_id,
      discount,
      category,
    });
    await product.save();
   
    res
      .status(200)
      .json({
        success: true,
        message: "product successfully created ",
        product,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "internal sever error", err });
  } finally{
     // Delete temporary file from local machine
     if(req.file?.path){
      try{
       await fs.unlink(req.file.path);
       console.log("Temporary file deleted");
      }
      catch(err){
        console.error(
                    "Failed to delete temporary file:",
                    err.message
                );
      }
     
     }
  }
};
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ success: true, message: "here your all products", products });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "internal server error", err });
  } 
};

//updating user products
exports.updateProduct = async (req, res) => {
 try {
    const update = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "successfully updated",
      update
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
      err
    });
  }
};
//deleting or removing user Proudct
exports.removeProduct = async (req, res) => {
  try {
    const remove = await  Product.findByIdAndDelete(req.params.id);
    if(!remove){
      return res.status(404).json({success:false,message:"product not found"})
    }
    res
      .status(200)
      .json({ success: true, message: "your product successfully got remove" });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "getting error in removing product",
        err,
      });
  }
};
//function for fetching single specfic product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: "false",
        message: "product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product details",
      product,
    });
  } catch (error) {
   res.status(500).json({
     success:"false",
     message:"inernal server error",
     error: error.message
   })
  }
};
