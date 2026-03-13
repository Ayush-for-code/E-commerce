const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");


const {createPayment,verifyPayment} = require("../controller/paymentcontroller");

router.post("/create",fetchUser,createPayment);
router.post("/verify",fetchUser,verifyPayment);

module.exports = router
