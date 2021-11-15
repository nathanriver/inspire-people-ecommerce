const { RajaOngkir } = require("../config");

exports.getProvinces = async (req, res) => {
  try {
    const {
      data: {
        rajaongkir: { results },
      },
    } = await RajaOngkir.get("/province");
    return res.json({ results });
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting provinces",
    });
  }
};
