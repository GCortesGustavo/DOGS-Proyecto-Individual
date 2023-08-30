const express = require("express");
const temperaments = express.Router();
const {Temperament} = require("../db");
const axios = require("axios");
const {API_KEY} = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
//const { getAllDogs } = require("../controllers/dogControllers");

temperaments.use(express.json())

temperaments.get("/temperament", async(req, res) => {
    const allData = await axios(URL);
    try {
        let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No Info").map(dog => dog?.split(", "));
        let eachTemperament = [...new Set(everyTemperament.flat())];
        eachTemperament.forEach(temp => {
            if(temp) {
                Temperament.findOrCreate({where: {name: temp}})
            }
        })
        eachTemperament = await Temperament.findAll();
        res.status(200).json(eachTemperament);
    } catch (error) {
        res.status(404).send(error)
    }
});


module.exports = temperaments;