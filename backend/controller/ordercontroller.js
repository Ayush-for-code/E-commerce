const Products = require("../modals/Product");
const Order = require("../modals/Order");

exports.createOrder = async (req,res)=>{
   try{
const userId = req.user.id;
   const {productId, quantity} = req.body; //taking variables from body using deconstructing method
   //checking for product
   const product = await Products.findById(productId);
   if(!product){
      return res.status(404).json({sucess:false,message:"product not found"})
   }
   //check for stocks before order
   if(product.stock < quantity){
    return res.status(404).json({sucess:false,message:"not enough product"})
   }
   let order = new Order({
      userId,
      items:[{
         productId,quantity
      }],
      totalPrice: product.price * quantity,
      status:"Pending"
   })
  //reducing stocks after purcahsing product
  product.stock -= quantity;
  await product.save()

   //saving order
   await order.save();
   res.status(201).json({success:true,message:"successfully created a order (Pending)",order});
   }
   catch(err){
      res.status(500).json({success:false,message:"faield to create order"});
   }


}
exports.getUserOrder = async (req,res)=>{
   try{
   const userId = req.user.id;
   //this find all order which belongs to the user
   const orders = await Order.find({userId});
   if(!orders || orders.length === 0){
      return res.status(404).json({success:false,message:"order not found"});
   }
   res.status(200).json({success:true,message:"here your order",order});

   }
   catch(err){
      res.status(500).json({success:false,message:"failed to get order"});
   }
  
}
exports.updateUserStatus = async (req,res)=>{
 
}
// this is endpoint for cancle order
exports.cancleOrder = async (req,res)=>{
 try{
 const userId = req.user.id;
  const {orderId} = req.body;
  if(!orderId){
   return res.status(404).json({success:false,message:"orderid required"});
  }
  const order = await Order.findOne({_id:orderId,userId});
   if(!order){
   return res.status(404).json({success:false,message:"order not found"});
  }
  order.status = "Cancelled"
  await order.save();
  res.status(200).json({success:true,message:"successfully cancle your order"});
 }
 catch(err){
    res.status(200).json({success:false,message:"failed to cancle your order"});
 }
   }

//this is endpoint for confirm user order
exports.confirmOrder = async (req,res)=>{
    try{
  const userId = req.user.id;
  const {orderId} = req.body;
  const order = await Order.findOne({_id:orderId,userId});
  if(!order){
   return res.status(404).json({success:false,message:"order not found"});
  }
  order.status = "Confirm";
  await order.save();
  res.status(200).json({success:true,message:"successfully confirm your order"});
    }
    catch(err){
      res.status(200).json({success:false,message:"failed to confirm your order"});
    }
   }   

