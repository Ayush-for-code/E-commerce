const Razorpay = require("razorpay");
const dotenv = require("dotenv")
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEY,
  key_secret: process.env.SECRET
});

module.exports = razorpay;
