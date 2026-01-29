const Address = require("../modals/Address");

exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phoneNo, addressLine, state, city, pincode, landmark, country } = req.body;

    if (!name || !phoneNo || !addressLine || !state || !city || !pincode || !country) {
      return res.status(400).json({ success: false, message: "All required fields missing" });
    }

    let addressDoc = await Address.findOne({ userId });

    const newAddress = {
      name,
      phoneNo,
      addressLine,
      state,
      city,
      pincode,
      landmark,
      country,
      isDefault: false
    };

    if (!addressDoc) {
      addressDoc = await Address.create({
        userId,
        addresses: [newAddress]
      });
    } else {
      addressDoc.addresses.push(newAddress);
      await addressDoc.save();
    }

    res.status(201).json({
      success: true,
      message: "Address added successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Cannot create address",
      error: err.message
    });
  }
};


//endpoint for getting all address
exports.getAddress = async(req,res)=>{
 try{
     const userId = req.user.id;
    
  const addressDoc = await Address.findOne({userId});
  if(!addressDoc || addressDoc.addresses.length === 0){
    return res.status(404).json({success:false,message:"address not found"});
  }
  res.status(200).json({success:true,message:"your addresses",addressDoc});
 }
 catch(err){
    res.status(500).json({success:false,message:"internal server error",err})
 }
}
//enidpoint for updating address
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.addressId;

    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "addressId is required"
      });
    }

    const {
      name,
      phoneNo,
      addressLine,
      state,
      city,
      pincode,
      landmark,
      country
    } = req.body;

    const addressDoc = await Address.findOne({ userId });

    if (!addressDoc) {
      return res.status(404).json({
        success: false,
        message: "No address document found"
      });
    }

    const address = addressDoc.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    address.name = name ?? address.name;
    address.phoneNo = phoneNo ?? address.phoneNo;
    address.addressLine = addressLine ?? address.addressLine;
    address.landmark = landmark ?? address.landmark;
    address.country = country ?? address.country;
    address.state = state ?? address.state;
    address.city = city ?? address.city;
    address.pincode = pincode ?? address.pincode;

    await addressDoc.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address
    });
  } catch (err) {
    console.error("Update address error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

//this is endpoint for removing address
exports.removeAddress = async(req,res)=>{
try{
    const userId = req.user.id;
    const addressId = req.params.addressId
   
    if(!addressId){
        return res.status(404).json({success:false,message:"not found any addressid"});
    }
     const addressDoc = await Address.findOne({userId});
     //checking if addressDoc is found
     if(!addressDoc){
      return res.status(404).json({success:false,message:"address doc not found"});
     }

    //finding sub document 
    const address = addressDoc.addresses.id(addressId);
    if(!address){
        return res.status(404).json({success:false,message:"address not found"});
    }
    //remvoing sub document from array
     addressDoc.addresses.pull(addressId);
    await addressDoc.save()
     res.status(200).json({success:true,message:"successfully remove your address"});
}
catch(err){
    console.log("getting error in removing address",err);
    res.status(500).json({success:false,message:"internal server error"});
}
//endpoint for set default address
}
exports.setDefaultAddress = async(req,res)=>{
try{
    const userId = req.user.id;
const addressId = req.params.addressId;
const addressDoc = await Address.findOne({userId});

if(!addressDoc){
    return res.status(404).json({success:false,message:"addressDoc not found"});
}
if(!addressId){
    return res.status(404).json({success:false,message:"addressid not found"});
}
//find specfic address id 
const address = addressDoc.addresses.id(addressId);
if(!address){
    return res.status(404).json({success:false,message:"address not found"});
}
 addressDoc.addresses.forEach(addr =>{
    addr.isDefault = false;
 });

 address.isDefault = true;
 await addressDoc.save();
 res.status(200).json({success:true,message:"successfully set your address default"});
}
catch(err){
 res.status(500).json({success:false,message:"internal server error "});
}

}

// Endpoint to remove default flag from an address
exports.removeDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.addressId;

    const addressDoc = await Address.findOne({ userId });

    if (!addressDoc) {
      return res.status(404).json({
        success: false,
        message: "No address record found for this user"
      });
    }

    const address = addressDoc.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    if (!address.isDefault) {
      return res.status(400).json({
        success: false,
        message: "This address is not default, so nothing to remove"
      });
    }

    // Remove default flag
    address.isDefault = false;

    await addressDoc.save();

    res.status(200).json({
      success: true,
      message: "Default address removed successfully"
    });

  } catch (err) {
    console.log("Error in removeDefaultAddress:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
