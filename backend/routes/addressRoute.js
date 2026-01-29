const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser")
const {addAddress,getAddress,updateAddress,removeAddress,setDefaultAddress,removeDefaultAddress} = require("../controller/addresscontroller");

router.post("/add",fetchUser,addAddress);
router.get("/get",fetchUser,getAddress);
router.put("/update/:addressId",fetchUser,updateAddress);
router.delete("/remove/:addressId",fetchUser,removeAddress);
router.post("/setDefault/:addressId",fetchUser,setDefaultAddress);
router.post("/removeDefault/:addressId",fetchUser,removeDefaultAddress);



module.exports = router;