const Product = require("../modals/Product");


exports.filterProduct = async (req,res)=>{
try{
const {search,sort,maxPrice,minPrice,category,page =0,limit = 5 } = req.query;
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

console.log("query :",req.query)
//logic for pagination

const currentPage = Number(page) ;
const perPage = Number(limit);
const skip = (currentPage -1) * perPage;

 const totalProducts = await Product.countDocuments(query);

  const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);
  res.status(200).json({
      success: true,
      products,
      totalProducts,
      currentPage,
      totalPages: Math.ceil(totalProducts / perPage),
      hasMore: currentPage * perPage < totalProducts,
    });}
catch(err){
    res.status(500).json({success:false,message:"internal server error"});
}

}