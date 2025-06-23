const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    customerEmail: String,
    amount: Number,
    method: {
      type: String,
      enum: ["UPI", "COD", "Stripe", "PayPal", "Razorpay"],
    },
    status: {
      type: String,
      enum: ["Paid", "Failed", "Pending"],
      default: "Pending",
    },
    transactionId: String,
    settlementDate: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
