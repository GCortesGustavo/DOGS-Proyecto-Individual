const axios = require("axios");
require("dotenv").config();
const URL_API = process.env.URL_API;

const getAllApiTemp = async () => {
  const response = await axios.get(URL_API);
  let arrayTemperaments = [];

  for (let i = 0; i < response.data.length; i++) {
    if (
      response.data[i].hasOwnProperty("temperament") &&
      response.data[i].temperament !== null
    ) {
      const temperaments = response.data[i].temperament.split(", ");
      arrayTemperaments = arrayTemperaments.concat(temperaments);
    }
  }
  const temperaments = removeDuplicates(arrayTemperaments);

  return temperaments;
};

function removeDuplicates(array) {
  const occurrences = {};
  const result = [];

  for (const element of array) {
    const lowercaseElement = element.toLowerCase();
    if (!occurrences[lowercaseElement]) {
      occurrences[lowercaseElement] = 1;
      result.push(element);
    } else {
      occurrences[lowercaseElement]++;
    }
  }

  return result;
}

module.exports = getAllApiTemp;