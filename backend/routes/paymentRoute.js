const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");


const {createPayment,verifyPayment,fetchOrderById} = require("../controller/paymentcontroller");

router.post("/create",fetchUser,createPayment);
router.post("/verify",fetchUser,verifyPayment);
router.post("/fetch/:id",fetchUser,fetchOrderById);

module.exports = router
