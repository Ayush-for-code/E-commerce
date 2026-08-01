const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/clerkmiddleWare");


const {createPayment,verifyPayment,fetchOrderById} = require("../controller/paymentcontroller");

router.post("/create",requireAuth,createPayment);
router.post("/verify",requireAuth,verifyPayment);
router.post("/fetch/:id",requireAuth,fetchOrderById);

module.exports = router
