let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let DepositListModel = require("../DepositList/DepositListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {

  app.post('/Api/v1/photon', function (req, res) {
      console.log('you called photon')
      console.log(Object.values(req.params))
      res.send('ok')
  });

  app.post('/Api/v1/photon/close', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/create', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/event', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/properties', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/join', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/leave', function (req, res) {
      console.log(Object.values(req.params))
  });



  

  app.post('/Api/v1/photon/close', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/create', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/event', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/properties', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/join', function (req, res) {
      console.log(Object.values(req.params))
  });

  app.post('/Api/v1/photon/leave', function (req, res) {
      console.log(Object.values(req.params))
  });

//   app.post('/Api/v1/photon/create', function (req, res) {
//       console.log(Object.values(req.body))
//   });

}