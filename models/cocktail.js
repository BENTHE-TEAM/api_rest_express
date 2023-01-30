/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/*******************************/
/*** Définition du modèle Cocktail */
module.exports = (sequelize) => {
  return (Cocktail = sequelize.define(
    "Cocktail",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },
      recipe: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },
    },
    { paranoid: true }
  )); // Ici pour faire du softDelete
};

/****************************************/
/*** Ancienne Synchronisation du modèle */
// Cocktail.sync()
// Cocktail.sync({force: true})
// Cocktail.sync({alter: true})
