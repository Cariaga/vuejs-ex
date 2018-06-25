const mysql = require('mysql2');
const Sequelize = require('sequelize');
//model
 var Item = sequelize.define('Item', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name:Sequelize.STRING,
    description: Sequelize.STRING,
    qty: Sequelize.INTEGER
  });

  module.exports =Item;