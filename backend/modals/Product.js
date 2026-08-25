const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true,
    trim: true
  },

  stock: {
    type: Number,
    required: true,
    min: 0
  },

image: {
  type: [String],
  default: ["dont have image yet"]
},
 imagePublicId: {
    type: String,
    required: true,
  },
  
  discount:{
   type:Number,
   required:false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
