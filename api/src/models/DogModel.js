const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    ID:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    image:{
      type: DataTypes.BLOB,
      allowNull: false,
    },
    name: {
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
    yearsOfLife:{  
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 15,
      }
    }
  });
};
