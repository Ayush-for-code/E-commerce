
const Product = require("../modals/Product");
const Order = require("../modals/Order");
const crypto = require("crypto");

exports.createPayment = async (req, res) => {
  try {
    const { productId } = req.body; //never getting price/amount from fortend
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    //creating an order
    const options = {
      amount: product.price * 100,
      currency: "INR",
     receipt: `receipt_${Date.now()}`

    };
     const order = await razorpay.orders.create(options);
    return res.status(200).json({
      success: true,
      message: "successfully created payment",
      order,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;


  const genSingnature = crypto.createHmac("sha256",process.env.SECRET)
  .update(body.toString())
  .digest("hex");
  if(genSingnature === razorpay_signature){
    return res.status(200).json({
      success:true,
      message:"successfully verify your payment",
    })
  }else{
     return res.status(400).json({
      success:false,
      message:"failed to verify your payment",
    })
  }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};
