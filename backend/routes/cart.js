const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/clerkmiddleWare");


const {addToCart,getItem,updateItem,removeItem,increaseQuantity,decreaseQuantity,clearCart} = require("../controller/cartcontroller.js");
 
router.post("/add",requireAuth,addToCart);
router.get("/get",requireAuth,getItem);
router.put("/update",requireAuth,updateItem);
router.delete("/remove",requireAuth,removeItem);
router.post("/increase",requireAuth,increaseQuantity);
router.post("/decrease",requireAuth,decreaseQuantity);
router.post("/clear",requireAuth,clearCart);


module.exports = router;