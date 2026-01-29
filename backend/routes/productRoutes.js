const express = require("express");
const router = express.Router();

const {createProduct,getProduct,updateProduct,removeProduct} = require("../controller/productcontroller");

router.post("/create",createProduct);
router.get("/get",getProduct);
router.put("/update/:id",updateProduct);
router.delete("/remove/:id",removeProduct);

module.exports = router;