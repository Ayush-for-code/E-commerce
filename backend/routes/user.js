const express = require("express");
const router = express.Router();

const ClerkUser = require("../modals/ClerkUser");
const { requireAuth } = require("@clerk/express");
router.get("/me", async (req, res) => {
  try {
    console.log("req.auth:", req.auth);

   const{userId} = req.auth();

    console.log("Clerk ID from token:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Clerk user is not authenticated",
      });
    }

    const user = await ClerkUser.findOne({ clerkId: userId });

    console.log("MongoDB user:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in MongoDB",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("ME ROUTE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;