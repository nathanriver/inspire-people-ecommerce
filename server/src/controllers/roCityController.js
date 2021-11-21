const { RajaOngkir } = require("../config");

exports.getCities = async (req, res) => {
  try {
    const { province } = req.query;
    const {
      data: {
        rajaongkir: { results },
      },
    } = await RajaOngkir.get("/city", {
      params: { province },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting cities",
    });
  }
};

exports.getCity = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      data: {
        rajaongkir: { results },
      },
    } = await RajaOngkir.get("/city", {
      params: { id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting city",
    });
  }
};
