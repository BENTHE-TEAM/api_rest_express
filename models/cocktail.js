const { Sequelize, DataTypes } = require("sequelize");
const DB = require("./db.config");

const Cocktail = DB.define(
  "Cocktail",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    recipe: {
      type: DataTypes.TEXT,
    },
  },
  { paranoid: true }
);

module.exports = Cocktail;
