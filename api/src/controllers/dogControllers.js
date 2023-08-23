const axios = require("axios");
const {API_KEY} = process.env;
const { Temperament, Dog } = require("../db");
const URL = `https://api.thedogapi.com/v1/breeds`;
// const createDog = require("./helpers/createDog");


const getApiDogs = async () => {
    const dogsURL = await axios.get(URL);
    
    const dogsInfo =  dogsURL.data.map((dog) => {   
        return{
            id: dog.id,
            name: dog.name,
            image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
            breed_group: dog.breed_group,
            temperament : dog.temperament ? dog.temperament.split(", ") : [] ,
            life_span: dog.life_span,
            weight: dog.weight.metric,
            height: dog.height.metric,
        }
    });
    return dogsInfo;
};


const getDBInfoDog = async () =>{
    let dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
    return dogsDB
};

const getAllDogs = async () => {
    const apiInfo = await getApiDogs();
    const dbInfo = await getDBInfoDog();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo
}


module.exports = {
    getAllDogs,
    getApiDogs,
    getDBInfoDog,
}


