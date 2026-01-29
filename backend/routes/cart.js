const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");


const {addToCart,getItem,updateItem,removeItem,increaseQuantity,decreaseQuantity,clearCart} = require("../controller/cartcontroller.js");
 
router.post("/add",fetchUser,addToCart);
router.get("/get",fetchUser,getItem);
router.put("/update",fetchUser,updateItem);
router.delete("/remove",fetchUser,removeItem);
router.post("/increase",fetchUser,increaseQuantity);
router.post("/decrease",fetchUser,decreaseQuantity);
router.post("/clear",fetchUser,clearCart);


module.exports = router;