const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const productRoutes = require("./routes/product/productRoutes");
const orderRoutes = require("./routes/order/orderRoutes");
const customerRoutes = require("./routes/customer/customerRoutes");
const paymentRoutes = require("./routes/payment/paymentRoutes");
const shippingRoutes = require("./routes/shipping/shippingRoutes");
const reportRoutes = require("./routes/report/reportRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
//app.use("/api/auth", require("./routes/authRoutes"));

const cors = require("cors");
const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on http://localhost:${process.env.PORT || 5000}`);
});
