require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bannerRoutes = require("./routes/bannerRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const addressRoutes = require("./routes/addressRoutes");
const roProvinceRoutes = require("./routes/roProvinceRoutes");
const roCityRoutes = require("./routes/roCityRoutes");
const provinceRoutes = require("./routes/provinceRoutes");
const cityRoutes = require("./routes/cityRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const productDetailRoutes = require("./routes/productDetailRoutes");
const courierRoutes = require("./routes/courierRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", authRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/ro-provinces", roProvinceRoutes);
app.use("/api/ro-cities", roCityRoutes);
app.use("/api/provinces", provinceRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/product-details", productDetailRoutes);
app.use("/api/couriers", courierRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
