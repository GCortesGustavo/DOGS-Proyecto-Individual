const { Temperament } = require("../../db");

const getAllTemperamentsFromDB = async () => {
  try {
    const temperaments = await Temperament.findAll({
      attributes: ["id", "name"],
    });
    return temperaments;
  } catch (error) {
    console.error(
      "Error al obtener temperaments desde la base de datos:",
      error.message
    );
    throw error;
  }
};

module.exports = getAllTemperamentsFromDB;