const express = require("express");
const router = express.Router();

const { getSalesReport } = require("../controllers/salesReportController");
const { getProductReport } = require("../controllers/productReportController");
const { getCustomerReport } = require("../controllers/customerReportController");
const { getInventoryReport } = require("../controllers/inventoryReportController");

router.get("/sales", getSalesReport);
router.get("/products", getProductReport);
router.get("/customers", getCustomerReport);
router.get("/inventory", getInventoryReport);

module.exports = router;
