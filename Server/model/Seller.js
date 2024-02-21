const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pickupAddress: { type: String, required: true },
});

module.exports = mongoose.model("Seller", sellerSchema);
