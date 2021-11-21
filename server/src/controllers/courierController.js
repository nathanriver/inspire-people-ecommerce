const { User } = require("../models");
const { RajaOngkir } = require("../config");

exports.getCouriers = async (req, res) => {
  try {
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
    if (!user.addresses[0]) {
      return res.status(403).json({
        message: "No default address.",
      });
    }
    const destination = user.addresses[0].city_id;
    const { weight } = req.body;
    const {
      data: {
        rajaongkir: { results },
      },
    } = await RajaOngkir.post("/cost", {
      origin: 23,
      destination,
      weight,
      courier: "jne",
    });
    const couriers = [];
    results[0].costs.map((c) => {
      const courier = {
        code: results[0].code,
        service: c.service,
        value: c.cost[0].value,
        etd: c.cost[0].etd,
      };
      couriers.push(courier);
    });
    return res.json(couriers);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting couriers.",
    });
  }
};
