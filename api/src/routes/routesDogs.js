const express = require("express");
const dogs = express.Router();
const { Dog, Temperament } = require("../db.js");
const { getAllDogs, getDBInfoDog, getApiDogs } = require("../controllers/dogControllers.js");



dogs.use(express.json());

//Ruta para traer los dogs
dogs.get("/dogs", async(req, res) =>{
    const name = req.query.name
    try {
            const response = await getAllDogs();
            if(name) {
                let dogName = response.filter(
                    dog => dog.name.toLowerCase().includes(name.toLowerCase())
                );
                dogName.length ?
                res.status(200).send(dogName) :
                res.status(404).send("Can't find the dog")
            } else {
                res.status(200).send(response)
            }
        } catch (error) {
            return res.status(404).json("There is no dog's with this name")
        }
});


//Ruta para postear perros nuevos
dogs.post("/dogs", async(req, res)=>{
    try{
    const { name, height, weight, life_span, temperament} = req.body;
    const dogCreate = await Dog.create({ 
        name,
        height,
        weight,
        life_span,
        createdInBd: true,
        image: "https://www.dogbreedslist.info/uploads/dog-pictures/beagle-2.jpg",
    })
    const temperamentFilter = await Temperament.findAll({
        where: {name : temperament} })
    await dogCreate.addTemperaments(temperamentFilter)

    res.status(200).json(dogCreate)
    } catch(error){
        res.status(400).json({error: error.message})
    }
})


//Ruta para traer el dog por name
dogs.get("/dogs/name", async (req, res) => {
    try {
        const { name } = req.query;
        const allDogs = await getAllDogs()

        if (name) {
            const dog = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            res.status(200).json(dog);
        } else {
            res.status(404).send('faltan datos');
        }
    } catch (error) {
        res.status(500).send(error.message );
    }
});

//Ruta para traer el dog por id
dogs.get("/dogs/:idRaza", async(req, res) => {
        try {
            let dog = null ;
            const { idRaza } = req.params;
            const getDogs = await getApiDogs(); 
            const getDogsDB = await getDBInfoDog();
            
            dog = await getDogs.find((perro) => perro.id == idRaza); //TRAE LA INFO DE LA API
            
            if (!dog) {
                dog = await getDogsDB.find((perro) => perro.id == idRaza);
            } else {
                res.json(dog);
            }
    } catch (error) {
        res.status(500).json({mensaje: "Error al obtener el detalle de la raza de perros"})
    }
})



module.exports = dogs;
