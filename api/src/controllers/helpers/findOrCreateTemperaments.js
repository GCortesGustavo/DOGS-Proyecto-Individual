const {Temperament} = require("../../db")
async function findOrCreateTemperaments(temperamentsArray) {
    const newArray = [];
  
    for (const temperamentName of temperamentsArray) {
      // Buscar el temperamento en la base de datos
      const existingTemperament = await Temperament.findOne({
        where: { name: temperamentName },
      });
  
      if (existingTemperament) {
        // Si el temperamento existe, guardar su id en newArray
        newArray.push(existingTemperament.id);
      } else {
        // Si el temperamento no existe, crearlo en la base de datos
        const newTemperament = await Temperament.create({ name: temperamentName });
        // Guardar el id del nuevo temperamento en newArray
        newArray.push(newTemperament.id);
      }
    }
  
    return newArray;
  }

  module.exports = findOrCreateTemperaments