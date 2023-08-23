const { Router } = require('express');

// Importar todos los routers;
const dogsRouter = require("../routes/routesDogs.js")
const temperamentsRouter = require("../routes/routesTemperaments.js");
// const breeds = require("./routesBreedsNOUSE.js");


const router = Router();

// Configurar los routers


router.use("/", dogsRouter);
router.use("/", temperamentsRouter)
// router.use("/", breeds)

module.exports = router;
