const getAllTemperamentsFromDB = require("./helpers/getAllTemperamentsFromDB");
//const filterDate = require("./helpers/functions/filterDate");

const temperamentsController = {
getAllTemperaments: async (_req, res) => {
    try {
        const temperaments = await getAllTemperamentsFromDB();
        res.status(200).json(temperaments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener perros" });
    }
}
};

module.exports = temperamentsController;