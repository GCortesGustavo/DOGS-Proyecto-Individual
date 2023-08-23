const getAllDogs = require("./getAllDogs");

const getDogById = async (id) => {
const dogs = await getAllDogs();
const dog = findObjectById(id, dogs);
return dog;
};

function findObjectById(id, data) {
return data.find((item) => {
    return item.id == id;
});
}

module.exports = getDogById;