const express = require("express");
const router = express.Router();
const upload  = require("../middleware/multer");
const requireAuth = require("../middleware/clerkmiddleWare");

const {createProduct,getProduct,updateProduct,removeProduct,getSingleProduct} = require("../controller/productcontroller");

router.post("/create",requireAuth,upload.single("image"),createProduct);
router.get("/get",requireAuth,getProduct);
router.put("/update/:id",requireAuth,updateProduct);
router.delete("/remove/:id",requireAuth,removeProduct);
router.get("/single/:id",requireAuth,getSingleProduct);

module.exports = router;