const { User, Order } = require("../models");
const _ = require("lodash");

exports.getUserOrders = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.userId,
      },
      include: {
        association: "orders",
        attributes: ["order_number", "status", "total", "created_at"],
        include: {
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
      },
    });
    return res.json(user.orders);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting orders",
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const data = await Order.findOne({
      where: {
        order_number: orderNumber,
      },
      attributes: {
        exclude: ["id", "paymentmethod_id", "address_id", "weight", "origin"],
      },
      include: [
        {
          association: "paymentMethod",
          attributes: {
            exclude: ["id"],
          },
        },
        {
          association: "address",
          attributes: [
            "label",
            "recipient_name",
            "phone_number",
            "full_address",
          ],
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
      message: "Error in getting order detail",
    });
  }
};
