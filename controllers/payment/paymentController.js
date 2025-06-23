const Payment = require("../models/Payment");

// 🔹 Get All Transactions
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch payments" });
  }
};

// 🔹 Filter Payments by Method / Status
exports.filterPayments = async (req, res) => {
  try {
    const { method, status } = req.body;
    const filter = {};

    if (method) filter.method = method;
    if (status) filter.status = status;

    const payments = await Payment.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Filter failed" });
  }
};

// 🔹 Settlement Report (basic summary)
exports.getSettlementReport = async (req, res) => {
  try {
    const settledPayments = await Payment.find({ status: "Paid" });

    const total = settledPayments.reduce((sum, p) => sum + p.amount, 0);
    const grouped = {};

    settledPayments.forEach((p) => {
      if (!grouped[p.method]) grouped[p.method] = 0;
      grouped[p.method] += p.amount;
    });

    res.json({
      success: true,
      totalPaidAmount: total,
      byMethod: grouped,
      totalTransactions: settledPayments.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Settlement report failed" });
  }
};
