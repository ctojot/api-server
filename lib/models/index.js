'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Food = require('./food.js')

const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

const sequelize = new Sequelize(SQL_CONNECTION_STRING); // singleton

module.exports = {
  sequelize,
  FoodModel: Food(sequelize, DataTypes),
};