const express = require("express");
const router = express.Router();
const {
  setShippingCharge,
  getShippingPartners,
  updateDeliveryStatus
} = require("../controllers/shippingController");

router.post("/charges", setShippingCharge);
router.get("/partners", getShippingPartners);
router.put("/status/:orderId", updateDeliveryStatus);

module.exports = router;
