const express = require("express");
const temperaments = express.Router();
const {Temperament} = require("../db");
const axios = require("axios");
const {API_KEY} = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { getAllDogs } = require("../controllers/dogControllers");

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

temperaments.get("/dog/", async (req, res) => {
    const temperament = req.query.temperament;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if(temperament === "all") return everyDog;
        else if(dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult)
})

// temperaments.post("/temperament/:temperament", async(req, res) => {
//     try {
//         const newTemperament = req.params.temperament;
//         const postedTemp = await Temperament.create({
//             name: newTemperament,
//         })
//         return res.status(200).json(postedTemp)
//     } catch (error) {
//         res.status(404).send(error)
//     }
// })

module.exports = temperaments;