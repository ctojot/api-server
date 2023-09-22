'use strict';

// Make sure to include the name of the table
const TrainersModel = (sequelize, DataTypes) => sequelize.define('Trainers', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pokemonNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = TrainersModel;