const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  getCustomerById,
  getCustomerOrders,
} = require("../controllers/customerController");

router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.get("/:id/orders", getCustomerOrders);

module.exports = router;
