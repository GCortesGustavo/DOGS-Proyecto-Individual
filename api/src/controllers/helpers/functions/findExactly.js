const findExactly = (dog, dogs) => {
    const dogName = dog.name.toLowerCase();
    const foundDog = dogs.find(
    (otherDog) => otherDog.name.toLowerCase() === dogName
    );

    if (foundDog) {
    return { exists: true, id: foundDog.id };
    } else {
    return { exists: false };
    }
};

module.exports = findExactly;