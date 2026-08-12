const mongoose = require("mongoose");

const ClerkUser = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: false,
      default: ""
    },

    firstName: String,
    lastName: String,
    imageUrl: String,

    role: {
      type: String,
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const Clerk = mongoose.model("Clerk", ClerkUser);

module.exports = Clerk;