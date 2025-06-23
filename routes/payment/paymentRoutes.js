const express = require("express");
const router = express.Router();
const {
  getAllPayments,
  filterPayments,
  getSettlementReport
} = require("../controllers/paymentController");

router.get("/", getAllPayments);
router.post("/filter", filterPayments);
router.get("/settlements", getSettlementReport);

module.exports = router;
