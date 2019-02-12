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

  function DepositListLimitOffet(limit,offset,res){
    DepositListModel.DepositList(limit, offset, function (response) {
      res.send(response);
    });
  }
  app.get('/Api/v1/DepositList/Limit/:Limit/Offset/:Offset/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let limit = req.params.Limit;
    let offset = req.params.Offset;
    DepositListLimitOffet(limit,offset,res);
  });
  
  app.post('/Api/v1/DepositList/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let limit = req.params.Limit;
    let offset = req.params.Offset;
    DepositListLimitOffet(limit,offset,res);
  });
  function DepositListSearch(Column,Value,StartDate,EndDate,res){
    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        if (!isNullOrEmpty(StartDate)) {
          if (!isNullOrEmpty(EndDate)) {
            DepositListModel.DepositSearch(Column, Value, StartDate, EndDate, function (response) {
              if (response != undefined) {
                
                res.send(response);
              } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
              }
            });
          } else {
            res.send({
              EndDate: true
            });
          }
        } else {
          res.send({
            StartDate: true
          });
        }
      } else {
        res.send({
          InvalidValue: true
        });
      }
    } else {
      res.send({
        InvalidColumn: true
      });
    }
  }
  app.get('/Api/v1/DepositList/Search/Column/:Column/Value/:Value/StartDate/:StartDate/EndDate/:EndDate', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    let StartDate = req.params.StartDate;
    let EndDate = req.params.EndDate;
    DepositListSearch(Column,Value,StartDate,EndDate,res);

  });
  app.post('/Api/v1/DepositList/Search/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    let StartDate = req.body.StartDate;
    let EndDate = req.body.EndDate;
    DepositListSearch(Column,Value,StartDate,EndDate,res);

  });
}