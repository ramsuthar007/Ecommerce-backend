const Product = require("../models/Product");

exports.getInventoryReport = async (req, res) => {
  try {
    const products = await Product.find({}, "title stock price").sort({ stock: 1 });

    res.json({ success: true, inventory: products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Inventory report failed" });
  }
};
