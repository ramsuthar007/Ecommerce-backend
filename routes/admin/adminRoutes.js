const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/adminLoginController");
const { getAdminProfile } = require("../controllers/adminProfileController");
const { changePassword } = require("../controllers/adminPasswordController");

const { protectAdmin } = require("../middleware/adminAuthMiddleware"); // assume token auth middleware

router.post("/login", loginAdmin);
router.get("/profile", protectAdmin, getAdminProfile);
router.put("/change-password", protectAdmin, changePassword);

module.exports = router;
