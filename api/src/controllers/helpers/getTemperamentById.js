const { Temperament } = require("../../db");
const getTemperamentById = async (id) => {
  const temperament = await Temperament.findOne({
    where: { id },
  });
  return temperament;
};
module.exports = getTemperamentById;