const createString = (req) => {
    const queryNames = [];
    for (const query in req.query) {
    queryNames.push(query);
    }
    let string = "";
    if (queryNames.length > 1) {
    string =
        "Las querys " +
        queryNames.slice(0, -1).join(", ") +
        " y " +
        queryNames.slice(-1) +
        " no son validas.";
    } else {
    string = "La query " + queryNames[0] + " no es valida";
    }
    return string;
};

module.exports = createString;