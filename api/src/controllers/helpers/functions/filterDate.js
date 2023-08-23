const filterDate = (dogs) => {
    const newDogs = dogs.map(({ id, image, name, weight, temperament }) => ({
    id,
    image,
    name,
    weight,
    temperament,
    }));
    return newDogs;
};
module.exports = filterDate;