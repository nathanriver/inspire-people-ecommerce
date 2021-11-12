const { RajaOngkir } = require("../config");

exports.getProvinces = async (req, res) => {
  try {
    const {
      data: {
        rajaongkir: { results },
      },
    } = await RajaOngkir.get("/province");
    res.json({ data: results });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting provinces",
    });
  }
};
