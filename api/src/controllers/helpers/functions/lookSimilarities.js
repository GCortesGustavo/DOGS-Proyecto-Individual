const buscarSimilitudes = (name, objetos) => {
    const nombreBuscado = name.toLowerCase();
    const filteredArray = objetos.filter((item) => {
    const nombreObjeto = item.name.toLowerCase();
    return nombreObjeto.includes(nombreBuscado);
    });

    filteredArray.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

      // Ordenar alfabéticamente
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

      // Ordenar por orden de inclusión
    return a.name.indexOf(name) - b.name.indexOf(name);
    });

    return filteredArray;
};

module.exports = buscarSimilitudes;