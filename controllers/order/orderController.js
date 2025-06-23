const Order = require("../models/Order");
const Payment = require("../models/Payment"); // import this too

// 🔹 Create Order with Payment
exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Step 1: Save Order
    const order = new Order(orderData);
    await order.save();

    // Step 2: Save Payment info (if payment method is not COD)
    if (orderData.paymentMethod !== "COD") {
      const payment = new Payment({
        orderId: order._id,
        customerEmail: order.customer.email,
        amount: order.totalAmount,
        method: order.paymentMethod,
        status: order.paymentStatus || "Paid",
        transactionId: "TXN" + Date.now(), // or from Razorpay/Stripe etc.
        settlementDate: orderData.paymentMethod === "COD" ? null : new Date(),
      });

      await payment.save();
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};


// 🔹 Get All Orders with Filters
exports.getAllOrders = async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;
    let filter = {};
    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// 🔹 Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};

// 🔹 Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, trackingNumber } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, trackingNumber },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// 🔹 Request Refund
exports.requestRefund = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { isRefundRequested: true },
      { new: true }
    );
    res.json({ success: true, message: "Refund requested", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Refund failed" });
  }
};
