"use strict";
require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./collection-class')
const user = require('./users-model')
const food = require('./food')
const clothes = require('./clothes')


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};
//to prepar connection 
const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const foodModel = food(sequelize, DataTypes);
const clothesModel = clothes(sequelize, DataTypes);
const foodCollect = new Collection(foodModel);
const clothesCollect = new Collection(clothesModel);

module.exports = {
    DB: sequelize,
    foodCollection: foodCollect,
    clothesCollection: clothesCollect,
    user: user(sequelize, DataTypes)
}