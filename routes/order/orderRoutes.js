const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  requestRefund,
} = require("../../controllers/order/orderController");

router.post("/create", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id/update-status", updateOrderStatus);
router.post("/:id/request-refund", requestRefund);

module.exports = router;
