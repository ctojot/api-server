'use strict';

// Make sure to include the name of the table
const PokemonModel = (sequelize, DataTypes) => sequelize.define('Pokemon', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trainerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = PokemonModel;