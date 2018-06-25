var express = require('express');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const  sequelize = new Sequelize('sampledb', 'user', 'user', {
  host:'172.30.166.206',
  port: 3306,
  dialect: 'mysql'
});
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

  module.exports.Item =Item;