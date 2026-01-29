const express = require("express");
const connectToMongo = require("./db");
connectToMongo();
const app = express();
var  cors = require("cors")
const PORT = process.env.PORT || 3000;


app.use(cors())
app.use(express.json());
 //making route for Authtication 

app.use("/api/auth",require("./routes/auth"));
app.use("/api/cart",require("./routes/cart"));
app.use("/api/product",require("./routes/productRoutes"));
app.use("/api/order/",require("./routes/order"));
app.use("/api/address",require("./routes/addressRoute"));
app.use("/api/",require("./routes/filter"));

//server testing route 
app.get("/",(req,res)=>{
   res.send("your backend sever is running");
}); 

app.listen(PORT,()=>{
    console.log(`✅ your server is running on ${PORT}`);
});

