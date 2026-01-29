const jwt = require("jsonwebtoken");
const JWT_SECRET = "itsmechochi";

const fetchUser = (req,res,next)=>{
  //auth-token is coming from token
  const token = req.header("auth-token");
  if(!token){
     return res.status(404).json("Access denied. token is missing");
  }
  try{
   //verifing token
   const data = jwt.verify(token,JWT_SECRET);
   req.user = data.user; //attach user id
   next()
  }
  catch(err){
    res.status(401).json({success:false,message:"invaild or expired token",err})
  }
}

module.exports = fetchUser;