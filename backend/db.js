//db.js
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/e-commerce";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>console.log("✅successfuly connected to mongo"))
    .catch(err=>console.log("❌ can't able to conntect to database due ",err));
}



module.exports = connectToMongo;