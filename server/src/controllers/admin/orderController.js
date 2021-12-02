const { Order } = require("../../models");

exports.getOrders = async (req, res) => {
  try {
    const data = await Order.findAll({
      include: {
        association: "user",
      },
      order: [["created_at", "DESC"]],
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting orders.",
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Order.findOne({
      where: {
        id,
      },
      include: [
        {
          association: "paymentMethod",
          attributes: {
            exclude: ["id"],
          },
        },
        {
          association: "orderAddress",
          attributes: ["recipient_name", "phone_number", "full_address"],
        },
        {
          association: "orderDetails",
          attributes: ["quantity"],
          include: {
            association: "productDetail",
            attributes: ["id"],
            include: [
              {
                association: "productSize",
                attributes: ["name"],
              },
              {
                association: "product",
                attributes: ["slug", "name", "color", "price", "image_url"],
              },
            ],
          },
        },
      ],
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting order.",
    });
  }
};
