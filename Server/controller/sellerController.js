const User = require("../model/User");
const Seller = require("../model/Seller");

const createSeller = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { upiId, pickupAddress, sellerName } = req.body;
    await User.findByIdAndUpdate(userId, { $set: { isSeller: true } });
    const newSeller = new Seller({ userId, pickupAddress, upiId, sellerName });
    const sellerDocument = await newSeller.save();
    return res.status(201).json(sellerDocument);
    return;
  } catch (error) {
    console.log(error);
    next();
  }
};

const updateSeller = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { upiId, pickupAddress, sellerName } = req.body;
    await Seller.findOneAndUpdate(
      { userId: userId },
      { $set: { upiId, pickupAddress, sellerName } },
      { returnDocument: true }
    );
  } catch (error) {
    consoler.log(error);
    next();
  }
};

const sellerController = {
  createSeller,
  updateSeller,
};

module.exports = sellerController;
