'use strict';

require('dotenv').config();
const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

console.log('CURRENT ENVIORNMENT', process.env.NODE_ENV);

const { Sequelize, DataTypes } = require('sequelize');

const pokemon = require('./pokemon.js');
const trainers = require('./trainers.js');
// const Collection = require('./Collection.js');

const sequelize = new Sequelize(SQL_CONNECTION_STRING); // Singleton

const PokemonModel = pokemon(sequelize, DataTypes);
const TrainersModel = trainers(sequelize, DataTypes);

// Creates our relations in the SQL Table
PokemonModel.belongsTo(TrainersModel, { foreignKey: 'customerId', targetKey: 'id' }); 
TrainersModel.hasMany(PokemonModel, { foreignKey: 'customerId', sourceKey: 'id' });

module.exports = {
  sequelize,
  PokemonModel: pokemon(sequelize, DataTypes),
  TrainersModel: trainers(sequelize, DataTypes),
};