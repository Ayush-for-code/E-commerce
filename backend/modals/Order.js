const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true,

},
items:[{
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true
    },
    name:String,
    price:Number,
    quantity:Number,
    totalPrice:Number
}],
paymentInfo:{
    method:{
        type:String,
        default:"COD" // COD, UPI, CARD,etc
    },
    status:{
        type:String,
        default:"pending" // pending , paided , failed 
    }
},
orderAmount:{
    subTotal:Number,
    deliveryCharge:Number,
    discount:Number,
    total:Number
},
shippingAddress:{
    address:String,
    state:String,
    city:String,
    pincode:Number
},
status:{
    type:String,
    default:"processing", // processing , shipped , deliverd
},
createdAt:{
    type:Date,
    default:Date.now

}

})

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;