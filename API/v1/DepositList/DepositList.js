let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let DepositListModel = require("../DepositList/DepositListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {

  app.get('/Api/v1/DepositList/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    DepositListModel.DepositList(function(response){
      res.send(response);
    });
  });
  app.get('/Api/v1/DepositList/Min/:Min/Max/:Max', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    DepositListModel.DepositList(function(response){
      res.send(response);
    });
  });

}