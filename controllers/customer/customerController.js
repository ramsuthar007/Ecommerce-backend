const User = require("../models/User");
const Order = require("../models/Order");

// 🔹 Get All Customers
exports.getAllCustomers = async (req, res) => {
  try {
    const users = await User.find().select("-__v").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch customers" });
  }
};

// 🔹 Get Customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v");
    if (!user) return res.status(404).json({ message: "Customer not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch customer" });
  }
};

// 🔹 Get Order History of Customer
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "customer.email": req.params.id });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
