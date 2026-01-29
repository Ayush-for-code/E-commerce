const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // Correct bcrypt import
const jwt = require("jsonwebtoken");
const User = require("../modals/User");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "itsmechochi";

// Create a user
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
], 
async (req, res) => {
    let success = false;
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false ,errors: errors.array() });
    }

    try {
        // Check if user exists
        const existedUser = await User.findOne({ email: req.body.email });
        if (existedUser) {
            return res.status(400).json({success:false, error: "This user already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        const data = {
            user:{
              id:savedUser.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success = true

        res.json({ success, authtoken, message:"user sucesfully created "});

    } catch (err) {
        console.error(err);
        res.status(500).json({ success:false,error: "Server error" });
    }
});

// 2 route for checking for login
router.post("/login",[
    body("email","please enter valid email").isEmail(),
    body("password","please enter vaild password").isLength({min:5})
],async(req,res)=>{
    //validate fields
 const errors = validationResult(req);
 if(!errors.isEmpty()){
    res.status(400).json({sucess:false , errors: errors.array()});
 } 
 //checking user email and password if it does not match from database by deconstruction method
 const {email,password} = req.body;
 try{
    const user = await User.findOne({email});
 if(!user){
    res.status(400).json("please login with right creadinals");
 }
 const passwordcompare = bcrypt.compare(password,user.password);
 if(!passwordcompare){
    res.status(400).json("please login with right creadinals");
 }
 // verifying user from database through id
 const payload = {
    user:{
       id:user.id
    }
 }
 // passing authtoken to the user
  const authtoken = jwt.sign(payload,JWT_SECRET);
  success = true;
  res.josn({success,authtoken});
 }
 catch(err){
    console.log("there is an error",error.message);
   res.status(500).json({error:"internal server error"})
 }
})

module.exports = router;
