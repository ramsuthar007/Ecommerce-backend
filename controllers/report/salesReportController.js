const Order = require("../models/Order");

exports.getSalesReport = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.json({ success: true, sales });
  } catch (err) {
    res.status(500).json({ success: false, message: "Sales report failed" });
  }
};
