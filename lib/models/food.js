'use strict';

// const { Sequelize, DataTypes } = require('sequelize');

// const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

// const sequelize = new Sequelize(SQL_CONNECTION_STRING); // singleton

// Make sure to include the name of the table
const FoodModel = (sequelize, DataTypes) => sequelize.define('Food', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});



module.exports = FoodModel;