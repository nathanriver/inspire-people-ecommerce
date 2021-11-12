require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bannerRoutes = require("./routes/banner");
const productRoutes = require("./routes/product");
const paymentMethodRoutes = require("./routes/paymentMethod");
const addressRoutes = require("./routes/address");
const provinceRoutes = require("./routes/province");
const cityRoutes = require("./routes/city");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/banners", bannerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/provinces", provinceRoutes);
app.use("/api/cities", cityRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
