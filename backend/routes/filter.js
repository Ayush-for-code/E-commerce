const express = require("express");
const router = express.Router();

const {filterProduct} = require("../controller/filtercontroller");

router.get("/filter",filterProduct);

module.exports = router;