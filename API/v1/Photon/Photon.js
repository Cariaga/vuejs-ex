let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let DepositListModel = require("../DepositList/DepositListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');

let photonvariables = [];
let photonActions = [];
let photonParams = [];

module.exports = function (app) {

  app.post('/Api/v1/photon', function (req, res) {
      console.log('you called photon')
    //   console.log('you called photon');
      photonActions.push('you called photon')

      var status = 200;
      res.status(status).end(http.STATUS_CODES[status]);

  });

  app.post('/Api/v1/photon/close', function (req, res) {
      console.log('you called photon');
      photonActions.push('you called photon/close');
      photonParams.push(req.params);
      photonvariables.push({Actor : req.params.ActorNr, UserId: req.params.UserId, NickName: req.params.NickName});
      
        res.sendStatus(200);
  });

  app.post('/Api/v1/photon/create', function (req, res) {
      console.log('you called photon');
      photonActions.push('you called photon/create');
       photonParams.push(req.params);
      photonvariables.push({Actor : req.params.ActorNr, UserId: req.params.UserId, NickName: req.params.NickName});

        res.sendStatus({ "State" : "", "ResultCode" : 0 });
  });

  app.post('/Api/v1/photon/event', function (req, res) {
      console.log('you called photon');
      photonActions.push('you called photon/event');
        res.sendStatus(200);
  });

  app.post('/Api/v1/photon/properties', function (req, res) {
      console.log('you called photon');
      photonActions.push('you called photon/properties');
        res.sendStatus(200);
  });

  app.post('/Api/v1/photon/join', function (req, res) {
      console.log('you called photon');
      photonActions.push('you called photon/join');
        res.sendStatus(200);
  });

  app.post('/Api/v1/photon/leave', function (req, res) {
      console.log('you called photon');
      photonActions.push('you called photon/leave');
    
        res.sendStatus(200);
  });

  app.get('/Api/v1/photon/getActions', function (req, res) {
      res.send(photonActions);
  });
  app.get('/Api/v1/photon/getVariables', function (req, res) {
      res.send(photonvariables);
  });
  app.get('/Api/v1/photon/getParams', function (req, res) {
      res.send(photonParams);
  });



//   app.post('/Api/v1/photon/create', function (req, res) {
//       console.log(Object.values(req.body))
//   });

}