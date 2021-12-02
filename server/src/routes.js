const express = require("express");
const router = express.Router();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const userOrderRoutes = require("./routes/userOrderRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const provinceRoutes = require("./routes/provinceRoutes");
const cityRoutes = require("./routes/cityRoutes");
const productDetailRoutes = require("./routes/productDetailRoutes");
const courierRoutes = require("./routes/courierRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productSizeRoutes = require("./routes/productSizeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const manageProductRoutes = require("./routes/manageProductRoutes");
const manageProductDetailRoutes = require("./routes/manageProductDetailRoutes");

router.use("/api", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/user/addresses", addressRoutes);
router.use("/api/user/orders", userOrderRoutes);
router.use("/api/orders", orderRoutes);
router.use("/api/banners", bannerRoutes);
router.use("/api/products", productRoutes);
router.use("/api/products", manageProductDetailRoutes);
router.use("/api/payment-methods", paymentMethodRoutes);
router.use("/api/provinces", provinceRoutes);
router.use("/api/cities", cityRoutes);
router.use("/api/product-details", productDetailRoutes);
router.use("/api/couriers", courierRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/categories", productSizeRoutes);
router.use("/api/categories", manageProductRoutes);

module.exports = router;
