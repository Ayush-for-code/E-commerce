const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/clerkmiddleWare")
const {addAddress,getAddress,updateAddress,removeAddress,setDefaultAddress,removeDefaultAddress,fetchDefaultAddress} = require("../controller/addresscontroller");

router.post("/add",requireAuth,addAddress);
router.get("/get",requireAuth,getAddress);
router.put("/update/:addressId",requireAuth,updateAddress);
router.delete("/remove/:addressId",requireAuth,removeAddress);
router.post("/setDefault/:addressId",requireAuth,setDefaultAddress);
router.post("/removeDefault/:addressId",requireAuth,removeDefaultAddress);
router.post("/fetchDefault",requireAuth,fetchDefaultAddress)



module.exports = router;