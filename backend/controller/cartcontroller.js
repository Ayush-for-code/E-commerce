const Products = require("../modals/Product");
const Cart = require("../modals/Cart");
const ClerkUser = require("../modals/ClerkUser");

exports.addToCart = async (req, res) => {
  try {
    //now fetching id form clerk
    const {userId} = req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const mongoId = user._id;
    const { productId, quantity } = req.body;
    //cheching if product is exited in cart
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "product not found" });
    }
    //checking if stocks are avaible to buy
    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: "out of stock" });
    }
    //checking if user cart is already existed
    let cart = await Cart.findOne({ userId:mongoId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            quantity,
          },
        ],
      });
      await cart.save();
      return res.json({
        success: true,
        message: "item added to the cart (new cart created)",
      });
    }
    //if items already existded in user cart
    const existedItems = cart.items.find(
      (item) => item.productId.toString() === productId,
    );
    //increase quantity if product is already existed or if not add new product
    if (!existedItems) {
      cart.items.push({ productId, quantity });
    } else {
      existedItems.quantity += quantity;
    }
    //saving cart
    await cart.save();
    res.json({ success: true, message: "item added to the cart" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "internal server error", err });
  }
};
//endpoint for getting user cart
exports.getItem = async (req, res) => {
  try {
    const {userId} = req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const mongoId = user._id;
    if (!mongoId) {
      return res.status(400).json({
        success: false,
        message: "userId required",
      });
    }
    const cartItems = await Cart.findOne({ userId:mongoId }).populate(
      "items.productId",
    );
    if (!cartItems) {
     return res.status(400).json({
        success: false,
        message: "cart is empty",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "you get your cart", cartItems });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "internal server error", err });
  }
};
//this is endpoint for removing or deleting cartItems
exports.removeItem = async (req, res) => {
  try {
    const {userId} = req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const mongoId = user._id;
    const { productId } = req.body;
    //finding user cart from id
    const cart = await Cart.findOne({ userId:mongoId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });
    }
    //removing items according to their product item
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    //saving user updated cart
    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "your item successfully removed" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "internal server error", err });
  }
};
//enpoint for updating existed items

exports.updateItem = async (req, res) => {
  try {
    const {userId} = req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mongoId = user._id;
    const { productId, quantity } = req.body;
    //indentitfy user cart with userid
    const cart = await Cart.findOne({ userId:mongoId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });
    }
    //checking if item is founf in cart or not
    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "item not found in cart" });
    }
    item.quantity = quantity;

    //saving updated items
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "your cart is successfully updated" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to update items", err });
  }
};

//logic for increase item quantity
exports.increaseQuantity = async (req, res) => {
  try {
    // Get Clerk user
    const {userId} = req.auth();

    const user = await ClerkUser.findOne({ clerkId: userId});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mongoId = user._id;

    // Get product id from request
    const { productId } = req.body;

    // Find user's cart
    const cart = await Cart.findOne({ userId:mongoId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find item inside cart
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Check product stock
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Don't allow quantity greater than stock
    if (item.quantity + 1 > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Out of stock",
      });
    }

    // Increase quantity
    item.quantity += 1;

    // Save cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity increased successfully",
      cart,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//logic for decrease item qunatity
exports.decreaseQuantity = async (req, res) => {
  try {
    const {userId} = req.auth();

    const user = await ClerkUser.findOne({ clerkId: userId});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mongoId = user._id;
    const { productId } = req.body;

    // Find user's cart
    const cart = await Cart.findOne({ userId:mongoId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the item inside the cart
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Decrease quantity
    item.quantity -= 1;

    // Remove item if quantity becomes 0
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId,
      );
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//logic for clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const {userId} = req.auth();
    const user = await ClerkUser.findOne({ clerkId:userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mongoId = user._id;
    const cart = await Cart.findOne({ userId:mongoId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });
    }
    cart.items = [];
    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "your cart got successfully cleared" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "internal server error", err });
  }
};
