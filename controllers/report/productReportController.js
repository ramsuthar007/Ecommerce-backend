const Order = require("../models/Order");

exports.getProductReport = async (req, res) => {
  try {
    const performance = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
          totalRevenue: { $sum: "$items.price" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $project: {
          title: "$product.title",
          totalSold: 1,
          totalRevenue: 1
        }
      },
      { $sort: { totalSold: -1 } }
    ]);

    res.json({ success: true, performance });
  } catch (err) {
    res.status(500).json({ success: false, message: "Product report failed" });
  }
};
