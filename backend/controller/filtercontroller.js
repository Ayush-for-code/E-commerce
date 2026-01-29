const Product = require("../modals/Product");


exports.filterProduct = async (req,res)=>{
try{
const {search,sort,maxPrice,minPrice,category} = req.query;
let query = {};
if(search){
    query.name = {
        $regex:search,
        $options:"i"
    };
}

if(category){
  query.category = {
    $regex : `^${category}$`,
    $options : "i"
  }
}
if(maxPrice || minPrice){
    query.price = {}
    if(maxPrice) query.price.$lte = Number(maxPrice);
    if(minPrice) query.price.$gte = Number(minPrice);
}
let sortOption = {}
if(sort === "high") sortOption.price = -1;
if(sort === "low") sortOption.price = 1;

const products = await Product.find(query).sort(sortOption);
console.log("query :",req.query)
res.status(200).json({success:true,count:products.length,products,message:"filter is working"});
}
catch(err){
    res.status(500).json({success:false,message:"internal server error"});
}

}