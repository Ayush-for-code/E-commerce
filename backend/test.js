require("dotenv").config({ path: __dirname + "/.env" });

const mongoose = require("mongoose");

const uri = `mongodb+srv://ayushbhardwajgdr_db_user:${process.env.MONGOPASS}@e-commerce.kyujmbj.mongodb.net/?appName=e-commerce`;

console.log("Connecting...");

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:");
    console.error(err);
    process.exit(1);
  });