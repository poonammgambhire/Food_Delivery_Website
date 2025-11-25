import userModel from "../models/userModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId; // prefer token, fallback to body
    const { itemId, quantity = 1 } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + Number(quantity);

    // remove if zero or negative
    if (cartData[itemId] <= 0) delete cartData[itemId];

    user.cartData = cartData;
    await user.save();

    return res.json({ success: true, message: "Added to cart", cartData: user.cartData });
  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// Remove item from cart (subtracts quantity, removes if <= 0)
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { itemId, quantity = 1 } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};
    if (!cartData[itemId]) {
      return res.status(400).json({ success: false, message: "Item not in cart" });
    }

    cartData[itemId] = (cartData[itemId] || 0) - Number(quantity);
    if (cartData[itemId] <= 0) delete cartData[itemId];

    user.cartData = cartData;
    await user.save();

    return res.json({ success: true, message: "Removed from cart", cartData: user.cartData });
  } catch (error) {
    console.error("removeFromCart error:", error);
    return res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const userId = req.userId || req.query.userId || req.body.userId;
    if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });

    const user = await userModel.findById(userId).select("cartData");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("getCart error:", error);
    return res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};
