const {
  sequelize,
  User,
  Order,
  OrderDetail,
  OrderAddress,
  ProductDetail,
} = require("../models");
const { RajaOngkir } = require("../config");
const generateOrderNumber = require("../utils/generateOrderNumber");

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
        exclude: [
          "id",
          "user_id",
          "paymentmethod_id",
          "address_id",
          "weight",
          "origin",
        ],
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
      message: "Error in getting order detail.",
    });
  }
};

exports.addOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { paymentmethod_id, courier_service, items } = req.body;
    const productDetails = [];
    let weight = 0;
    let subtotal = 0;
    await Promise.all(
      items.map(async (item) => {
        const productDetail = await ProductDetail.findOne({
          attributes: ["id", "stock"],
          where: {
            id: item.productdetail_id,
          },
          include: {
            association: "product",
            attributes: ["price", "weight"],
          },
        });
        weight += productDetail.product.weight * item.quantity;
        subtotal += productDetail.product.price * item.quantity;
        productDetails.push({
          values: productDetail,
          quantity: item.quantity,
        });
      })
    );
    const user = await User.findOne({
      where: {
        uuid: req.userId,
      },
      include: {
        association: "addresses",
        required: false,
        where: {
          is_default: true,
        },
      },
    });
    const defaultAddress = user.addresses[0];
    if (!defaultAddress) {
      return res.status(403).json({
        message: "No default address.",
      });
    }
    const {
      data: {
        rajaongkir: { results },
      },
    } = await RajaOngkir.post("/cost", {
      origin: 23,
      destination: defaultAddress.city_id,
      weight,
      courier: "jne",
    });
    const courierService = results[0].costs.find(
      (values) => values.service === courier_service
    );
    const shipping_fee = courierService.cost[0].value;
    const total = subtotal + shipping_fee;
    const order = await Order.create(
      {
        user_id: user.id,
        paymentmethod_id,
        order_number: generateOrderNumber(),
        status: "Pending",
        subtotal,
        courier: "jne",
        courier_service,
        shipping_fee,
        total,
        weight,
        origin: 23,
      },
      { transaction: t }
    );
    productDetails.forEach(async (productDetail) => {
      await OrderDetail.create(
        {
          productdetail_id: productDetail.values.id,
          order_id: order.id,
          quantity: productDetail.quantity,
        },
        { transaction: t }
      );
    });
    await OrderAddress.create(
      {
        city_id: defaultAddress.city_id,
        recipient_name: defaultAddress.recipient_name,
        phone_number: defaultAddress.phone_number,
        subdistrict: defaultAddress.subdistrict,
        postal_code: defaultAddress.postal_code,
        full_address: defaultAddress.full_address,
        order_id: order.id,
      },
      { transaction: t }
    );
    await t.commit();
    return res.json(order.order_number);
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: "Error in creating order.",
    });
  }
};
