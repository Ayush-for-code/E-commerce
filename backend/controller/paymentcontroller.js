
exports.createPayment = async(req,res)=>{
try{
res.status(200).json({success:true,message:"working buddy"});
}
catch(err){
 return res.status(500).json({success:false,message:"internal sever error"});
}
}
exports.verifyPayment = async(req,res)=>{
try{
res.status(200).json({success:true,message:"working buddy"});
}
catch(err){
 return res.status(500).json({success:false,message:"internal sever error"});
}
}