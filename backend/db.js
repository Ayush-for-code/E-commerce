//db.js
const mongoose = require("mongoose");
const mongoURI = `mongodb://ayushbhardwajgdr_db_user:${process.env.MONGOPASS}@ac-enybdfd-shard-00-00.kyujmbj.mongodb.net:27017,ac-enybdfd-shard-00-01.kyujmbj.mongodb.net:27017,ac-enybdfd-shard-00-02.kyujmbj.mongodb.net:27017/e-commerce?ssl=true&replicaSet=atlas-z99pm1-shard-0&authSource=admin&appName=e-commerce`;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>console.log("✅successfuly connected to mongo"))
    .catch(err=>console.log("❌ can't able to conntect to database due ",err));
}



module.exports = connectToMongo;