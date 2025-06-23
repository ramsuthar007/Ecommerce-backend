const Order = require("../models/Order");

exports.getCustomerReport = async (req, res) => {
  try {
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$customer.email",
          totalSpent: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { totalSpent: -1 } }
    ]);

    res.json({ success: true, customers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Customer report failed" });
  }
};
