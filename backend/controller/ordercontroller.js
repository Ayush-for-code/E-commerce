const Products = require("../modals/Product");
const Order = require("../modals/Order");
const Address = require("../modals/Address")
const ClerkUser = require("../modals/ClerkUser");

exports.createOrder = async (req, res) => {
  try {
    const {userId}= req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mongoId = user._id;
    const {items} = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items provided",
      });
    }

    const { productId, quantity,image } = items[0];
    const qty = Number(quantity);

    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    if (product.stock < qty) {
      return res.status(400).json({
        success: false,
        message: "not enough product",
      });
    }
    //calculate discount and total amount 
   
    const discount = 10;
 const deliveryCharge = 50;
     const subtotal = product.price * qty;
     const discountTotal = ( subtotal * discount) / 100;
    const total = Math.round(subtotal + deliveryCharge - discountTotal);
//logic for getting only deault user address
const addressDoc = await Address.findOne({userId:mongoId});
if(!addressDoc){
  return res.status(404).json({success:false,message:"addressDoc not found"});
}
const defaultAddress = addressDoc.addresses.find(add => add.isDefault);
if(!defaultAddress){
  return res.status(404).json({success:false,message:"no address is set to default"});
}

    let order = new Order({
      userId:mongoId,
      items: [
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: qty,
          totalPrice:subtotal,
          image:product.image[0]
        },
      ],
      orderAmount: {
        subTotal: subtotal,
        deliveryCharge: deliveryCharge,
        discount: discountTotal,
        total: total,
      },
      shippingAddress: {
        address:defaultAddress.addressLine,
        city:defaultAddress.city,
        state:defaultAddress.state,
        pincode:defaultAddress.pincode,
      },
      status: "processing",
    });

    product.stock -= qty;
    await product.save();

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to create order",
    });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const {userId}= req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mongoId = user._id;
    //this find all order which belongs to the user
    const orders = await Order.find({ userId:mongoId });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "order not found" });
    }
    res.status(200).json({ success: true, message: "here your order", orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to get order" });
  }
};
exports.updateUserStatus = async (req, res) => {};
// this is endpoint for cancle order
exports.cancleOrder = async (req, res) => {
  try {
    const {userId} = req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mongoId = user._id;
    const { orderId } = req.body;
    if (!orderId) {
      return res
        .status(404)
        .json({ success: false, message: "orderid required" });
    }
    const order = await Order.findOne({ _id: orderId, userId:mongoId });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order not found" });
    }
    order.status = "Cancelled";
    await order.save();
    res
      .status(200)
      .json({ success: true, message: "successfully cancle your order" });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, message: "failed to cancle your order" });
  }
};

//this is endpoint for confirm user order
exports.confirmOrder = async (req, res) => {
  try {
    const {userId} = req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mongoId = user._id;
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId, userId:mongoId });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order not found" });
    }
    order.status = "Confirm";
    await order.save();
    res
      .status(200)
      .json({ success: true, message: "successfully confirm your order" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to confirm your order" });
  }
};
