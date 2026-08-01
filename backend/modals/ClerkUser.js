const mongoose = require("mongoose");

const ClerkUser = new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
    },

    firstName:String,

    lastName:String,

    imageUrl:String,

    role:{
        type:String,
        default:"customer"
    },

    cart:[
        {
            productId:String,
            quantity:Number
        }
    ],

    addresses:[
        {
            fullName:String,
            phone:String,
            city:String,
            state:String,
            pinCode:String
        }
    ]

},{
    timestamps:true
});

const Clerk = mongoose.model("Clerk",ClerkUser);
module.exports = Clerk;