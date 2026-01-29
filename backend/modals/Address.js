const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   addresses:[{
    name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true,
    },
    addressLine:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:false,
    },
    country:{
        type:String,
        required:true,
        default:"india"
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    isDefault:{
        type:Boolean,
        required:false,
        default:false
    }
   }]
});

const Address = mongoose.model("Address",addressSchema);
module.exports = Address;