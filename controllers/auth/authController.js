const User = require("../../models/auth/User");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Send OTP
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = otpGenerator.generate(6, { digits: true });

  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min
  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email });
  }

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  // Send email
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });

  res.json({ success: true, message: "OTP sent to email." });
};

// ✅ Verify OTP & Login
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const token = generateToken(user);
  res.json({ success: true, token, user: { email: user.email, id: user._id } });
};
