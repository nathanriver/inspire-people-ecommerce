const express = require("express");
const router = express.Router();

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

const manageOrderRoutes = require("./routes/admin/orderRoutes");
const manageProductRoutes = require("./routes/admin/productRoutes");
const manageProductDetailRoutes = require("./routes/admin/productDetailRoutes");

router.use("/api", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/user/addresses", addressRoutes);
router.use("/api/user/orders", orderRoutes);
router.use("/api/banners", bannerRoutes);
router.use("/api/products", productRoutes);
router.use("/api/payment-methods", paymentMethodRoutes);
router.use("/api/provinces", provinceRoutes);
router.use("/api/cities", cityRoutes);
router.use("/api/product-details", productDetailRoutes);
router.use("/api/couriers", courierRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/categories", productSizeRoutes);

router.use("/api/orders", manageOrderRoutes);
router.use("/api/products", manageProductDetailRoutes);
router.use("/api/categories", manageProductRoutes);

module.exports = router;
