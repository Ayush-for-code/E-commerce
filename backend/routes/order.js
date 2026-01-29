const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");

const {createOrder,cancleOrder,getUserOrder,updateUserStatus,confirmOrder}= require("../controller/ordercontroller");

router.post("/create",fetchUser,createOrder);
router.post("/get",fetchUser,getUserOrder);
router.put("/update",fetchUser,updateUserStatus);
router.post("/cancle",fetchUser,cancleOrder);
router.post("/confirm",fetchUser,confirmOrder);


module.exports = router;