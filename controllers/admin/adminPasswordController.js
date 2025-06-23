const Admin = require("../models/Admin");

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.user.id);

    if (!admin || !(await admin.matchPassword(currentPassword))) {
      return res.status(400).json({ success: false, message: "Current password incorrect" });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Password change failed" });
  }
};
