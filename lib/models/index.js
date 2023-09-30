'use strict';

require('dotenv').config();

console.log('CURRENT ENVIORNMENT', process.env.NODE_ENV);

const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

const { Sequelize, DataTypes } = require('sequelize');

const pokemon = require('./pokemon.js');
const trainers = require('./trainer.js');
const Collection = require('./Collection.js');

const sequelize = new Sequelize(SQL_CONNECTION_STRING); // Singleton

const PokemonModel = pokemon(sequelize, DataTypes);
const TrainerModel = trainers(sequelize, DataTypes);

// Creates our relations in the SQL Table
PokemonModel.belongsTo(TrainerModel, { foreignKey: 'trainerId', targetKey: 'id' }); 
TrainerModel.hasMany(PokemonModel, { foreignKey: 'trainerId', sourceKey: 'id' });

module.exports = {
  sequelize,
  PokemonTable: new Collection(PokemonModel),
  TrainerTable: new Collection(TrainerModel),
};