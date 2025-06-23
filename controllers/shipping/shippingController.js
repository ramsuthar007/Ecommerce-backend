const Shipping = require("../models/Shipping");
const Order = require("../models/Order");
const DeliveryPartner = require("../models/DeliveryPartner");

// 🔹 Set delivery charges by location or product
exports.setShippingCharge = async (req, res) => {
  try {
    const { location, productId, charge } = req.body;

    const shipping = new Shipping({ location, productId, charge });
    await shipping.save();

    res.status(201).json({ success: true, shipping });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to set shipping charge" });
  }
};

// 🔹 Get all delivery partners
exports.getShippingPartners = async (req, res) => {
  try {
    const partners = await DeliveryPartner.find();
    res.json({ success: true, partners });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch delivery partners" });
  }
};

// 🔹 Update delivery status of an order
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, partnerId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.deliveryStatus = status;
    if (partnerId) order.shippingPartner = partnerId;

    await order.save();

    res.json({ success: true, message: "Delivery status updated", order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update delivery status" });
  }
};
