const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  let idCounter = 265;
  sequelize.define('dog', {
    id:{
      type: DataTypes.INTEGER,
      defaultValue: () => idCounter++,
      allowNull: false,
      primaryKey: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{  
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span:{  
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDB:{
      type: DataTypes.STRING,
      defaultValue : "db"
    },
    dueño:{
      type: DataTypes.STRING,
      allowNull : true,
      defaultValue: "Este perro no tiene dueño"
    }
  });
};
