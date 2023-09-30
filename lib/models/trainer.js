'use strict';

// Make sure to include the name of the table
const TrainerModel = (sequelize, DataTypes) => sequelize.define('Trainers', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pokeNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = TrainerModel;