const Products = require("../modals/Product");
const Cart = require("../modals/Cart");

exports.addToCart = async (req,res)=>{
  try{
    const userId = req.user.id;
     const {productId,quantity} = req.body;
   //cheching if product is exited in cart 
   const product = await Products.findById(productId);
   if(!product){
   return res.status(400).json({success:false,message:"product not found"});
   }
   //checking if stocks are avaible to buy
   if(product.stock < quantity){
   return res.status(400).json({success:false,message:"out of stock"});
   }
   //checking if user cart is already existed
   let cart =await Cart.findOne({userId});
   if(!cart){
     cart = new Cart({
        userId,
        items:[{
            productId,quantity
        }]
     });
   await cart.save();
   return res.json({success:true,message:"item added to the cart (new cart created)"});
     
   }
   //if items already existded in user cart
   const existedItems = cart.items.find(
    (item)=> item.productId.toString() === productId
   );
   //increase quantity if product is already existed or if not add new product
   if(!existedItems){
    cart.items.push({productId,quantity});
   }else{
    existedItems.quantity += quantity ;
   }
   //saving cart
   await cart.save();
   res.json({success:true,message:"item added to the cart"});
  }
  catch(err){
    console.log(err);
    res.status(500).json({success:false,message:"internal server error",err});
  }

}
//endpoint for getting user cart 
exports.getItem = async (req,res)=>{
   try{
    const userId = req.user.id;
    if(!userId){
      return res.status(400).json({
        success:false,
        message:"userId required"
      })
    }
   const cartItems = await Cart.findOne({userId}).populate("items.productId");
   if(!cartItems){
    res.status(400).json({
      success:false,message:"cart is empty"
    });
   }
   res.status(200).json({success:true,message:"you get your cart",cartItems});

   }
   catch(err){
    res.status(500).json({success:false,message:"internal server error",err});
   }
}
//this is endpoint for removing or deleting cartItems
exports.removeItem = async (req,res)=>{
   try{
    const userId = req.user.id;
    const {productId} = req.body;
    //finding user cart from id 
    const cart = await Cart.findOne({userId});
   
   if(!cart){
    return res.status(404).json({success:false,message:"cart not found"});

   }
   //removing items according to their product item
   cart.items = cart.items.filter(item => item.productId.toString() !== productId);
   //saving user updated cart 
   await cart.save()
    res.status(200).json({success:true,message:"your item successfully removed"});
   }
   catch(err){
    res.status(500).json({success:false,message:"internal server error",err})
   }
}
//enpoint for updating existed items

exports.updateItem = async (req,res)=>{
    try{
      const userId = req.user.id;
     const {productId,quantity} = req.body;
     //indentitfy user cart with userid 
    const cart = await Cart.findOne({userId});
    if(!cart){
      return res.status(404).json({success:false,message:"cart not found"});
    }
    //checking if item is founf in cart or not
    const item = cart.items.find(
      (i)=> i.productId.toString() === productId
    )
    if(!item){
      return res.status(404).json({success:false,message:"item not found in cart"});
    }
    item.quantity = quantity;

    //saving updated items
     await cart.save()

     res.status(200).json({success:true,message:"your cart is successfully updated"});
    }
    catch(err){
      res.status(500).json({success:false,message:"failed to update items",err});
    }
}

//logic for increase item quantity
exports.increaseQuantity = async (req,res)=>{
try{
  const userId = req.user.id;
const {productId} = req.body
const cart = await Cart.findOne({userId});
if(!cart){
  return res.status(404).json({success:false,message:"cart not found"});
}
const item = cart.items.find((i)=> i.productId.toString() === productId);
if(!item){
  return res.status(404).json({success:false,message:"item not found"});
}
//checking for stock availablity;
const product = await Products.findById({productId});
if(item.quantity + 1 > product.stock){
  return res.status(404).json({success:false,message:"out of stock"});
}
item.quantity += quantity;
//if quantity is less than 0 so remove it
if(item.quantity >= 0){
cart.items = cart.items.find(
 (item)=> item.productId.toString() !== productId 
)
}
//saving updated cart 
await cart.save()
res.status(200).json({success:true,message:"update quantity successfully"});
}
catch(err){
  res.status(500).json({sucess:false,message:"cannot able to update quantity",err});
}
}

//logic for decrease item qunatity
exports.decreaseQuantity = async (req,res)=>{
try{
  const userId = req.user.id;
const {productId} = req.body
const cart = await Cart.findOne({userId});
if(!cart){
  return res.status(404).json({success:false,message:"cart not found"});
}
const item = cart.items.find((i)=> i.productId.toString() === productId);
if(!item){
  return res.status(404).json({success:false,message:"item not found"});
}
item.quantity -= qunatity;
//if quantity is less than 0 so remove it
if(item.quantity <= 0){
cart.items = cart.items.filter(
 (item)=> item.productId.toString() !== productId 
)
}
//saving updated cart 
await cart.save()
res.status(200).json({success:true,message:"update quantity successfully"});
}
catch(err){
  res.status(500).json({sucess:false,message:"cannot able to update quantity",err});
}
}

//logic for clear entire cart 
exports.clearCart = async (req,res)=>{
try{
 const userId = req.user.id;
 const cart = await Cart.findOne({userId});
 if(!cart){
    return res.status(404).json({success:false,message:"cart not found"});
 }
 cart.items = [];
 await cart.save();
 res.status(200).json({success:true,message:"your cart got successfully cleared"});
}
catch(err){
res.status(500).json({success:false,message:"internal server error",err});
}
}

