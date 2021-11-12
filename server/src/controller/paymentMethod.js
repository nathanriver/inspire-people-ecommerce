const { PaymentMethod } = require("../models");

exports.getPaymentMethods = async (req, res) => {
  try {
    const data = await PaymentMethod.findAll();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error in getting payment methods" });
  }
};
