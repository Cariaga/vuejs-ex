let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let DepositListModel = require("../DepositList/DepositListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');

let photonActions = [];
let photonBase = []
let photonClose = [];
let photonCreate = [];
let photonEvent = [];
let photonProperties = [];
let photonJoin = [];
let photonLeave = [];
module.exports = function (app) {

  app.post('/Api/v1/photon', function (req, res) {
    photonActions.push('base called');
    photonBase.push(req.body)
    res.send({ "Message" : "ok", "ResultCode" : 0 });
  });

  app.post('/Api/v1/photon/close', function (req, res) {
    photonActions.push('close called');
    photonClose.push(req.body);
    res.send({ "Message" : "ok", "ResultCode" : 0 });
  });

  app.post('/Api/v1/photon/create', function (req, res) {
    photonActions.push('create called');
    photonCreate.push(req.body);
    res.send({ "Message" : "ok", "ResultCode" : 0 });
  });

  app.post('/Api/v1/photon/event', function (req, res) {
    photonActions.push('event called');
    photonEvent.push(req.body);
    res.send({ "Message" : "ok", "ResultCode" : 0 });
  });

  app.post('/Api/v1/photon/properties', function (req, res) {
    photonActions.push('properties called');
    photonProperties.push(req.body);
    res.send({ "Message" : "ok", "ResultCode" : 0 });
  });

  app.post('/Api/v1/photon/join', function (req, res) {
    photonActions.push('join called');
    photonJoin.push(req.body);
    res.send({ "Message" : "ok", "ResultCode" : 0 });
  });
    
  app.post('/Api/v1/photon/leave', function (req, res) {
    photonActions.push('leave called');
    photonLeave.push(req.body);
    res.send({ "Message" : "ok", "ResultCode" : 0 });
  });


  app.get('/Api/v1/photon/getActions', function (req, res) {
      res.send(photonActions);
  });

  app.get('/Api/v1/photon/getClose', function (req, res) {
      res.send(photonClose);
  });

  app.get('/Api/v1/photon/getCreate', function (req, res) {
      res.send(photonCreate);
  });

  app.get('/Api/v1/photon/getEvent', function (req, res) {
      res.send(photonEvent);
  });

  app.get('/Api/v1/photon/getProperties', function (req, res) {
      res.send(photonProperties);
  });

  app.get('/Api/v1/photon/getJoin', function (req, res) {
      res.send(photonJoin);
  });

  app.get('/Api/v1/photon/getLeave', function (req, res) {
      res.send(photonLeave);
  });



//   app.post('/Api/v1/photon/create', function (req, res) {
//       console.log(Object.values(req.body))
//   });

}