const verifyData = (dog) => {
    // Verificar si todas las propiedades están presentes y no son un string vacío
    const requiredProperties = ["image", "name", "weight", "height", "life_span"];
    for (const prop of requiredProperties) {
      if (
        !dog.hasOwnProperty(prop) ||
        typeof dog[prop] !== "string" ||
        dog[prop].trim() === ""
      ) {
        return false;
      }
    }
  
    // Verificar la propiedad "temperament"
      if (!dog.hasOwnProperty("temperament")) {
        return false;
      }
  
    // Si la propiedad "temperament" no es un array o es un array vacío, retornar false
      if (!Array.isArray(dog.temperament)) {
        return false;
      }
  
    return true;
  };
  
  module.exports = verifyData;