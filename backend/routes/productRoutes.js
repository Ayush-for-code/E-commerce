const express = require("express");
const router = express.Router();

const {createProduct,getProduct,updateProduct,removeProduct,getSingleProduct} = require("../controller/productcontroller");

router.post("/create",createProduct);
router.get("/get",getProduct);
router.put("/update/:id",updateProduct);
router.delete("/remove/:id",removeProduct);
router.get("/single/:id",getSingleProduct);

module.exports = router;