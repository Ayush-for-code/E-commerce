const express = require("express");
const router = express.Router();

const {addAddress,getAddress,updateAddress,removeAddress,setDefaultAddress,removeDefaultAddress,fetchDefaultAddress} = require("../controller/addresscontroller");

router.post("/add",addAddress);
router.get("/get",getAddress);
router.put("/update/:addressId",updateAddress);
router.delete("/remove/:addressId",removeAddress);
router.post("/setDefault/:addressId",setDefaultAddress);
router.post("/removeDefault/:addressId",removeDefaultAddress);
router.post("/fetchDefault",fetchDefaultAddress)



module.exports = router;