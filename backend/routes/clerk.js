const express = require("express");
const router = express.Router();
const {clerkWebhook} = require("../controller/clerkController");


router.post("/clerk",clerkWebhook);

module.exports = router;