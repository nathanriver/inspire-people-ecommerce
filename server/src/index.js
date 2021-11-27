require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const provinceRoutes = require("./routes/provinceRoutes");
const cityRoutes = require("./routes/cityRoutes");
const productDetailRoutes = require("./routes/productDetailRoutes");
const courierRoutes = require("./routes/courierRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productSizeRoutes = require("./routes/productSizeRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/addresses", addressRoutes);
app.use("/api/user/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/provinces", provinceRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/product-details", productDetailRoutes);
app.use("/api/couriers", courierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product-sizes", productSizeRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
