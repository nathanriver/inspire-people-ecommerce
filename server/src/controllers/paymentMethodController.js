const { PaymentMethod } = require("../models");

exports.getPaymentMethods = async (req, res) => {
  try {
    const data = await PaymentMethod.findAll();
    return res.json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in getting payment methods" });
  }
};
