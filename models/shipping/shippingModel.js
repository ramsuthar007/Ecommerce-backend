const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
  {
    location: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
    charge: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipping", shippingSchema);
