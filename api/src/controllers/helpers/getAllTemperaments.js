const getAllApiTemp = require("./functions/getAllApiTemp");


const getAllTemperaments = async(second) => {
  console.log(await getAllApiTemp())
};

module.exports = getAllTemperaments;