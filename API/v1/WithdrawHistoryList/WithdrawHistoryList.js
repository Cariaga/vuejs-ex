let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let WithdrawHistoryListModel = require ('../WithdrawHistoryList/WithdrawHistoryListModel');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {//SELECTION
  function WithdrawHistoryListSearch(Column,Value,StartDate,EndDate,res){
    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        if(!isNullOrEmpty(StartDate)){
          if(!isNullOrEmpty(EndDate)){
            WithdrawHistoryListModel.WithdrawSearch(Column, Value,StartDate,EndDate, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
              }
            });
          }else{
            res.send({
              EndDate: true
            });
          }
        }else{
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
  app.get('/Api/v1/WithdrawHistoryList/Search/Column/:Column/Value/:Value/StartDate/:StartDate/EndDate/:EndDate', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    let StartDate = req.params.StartDate;
    let EndDate = req.params.EndDate;
    WithdrawHistoryListSearch(Column,Value,StartDate,EndDate,res);
  });
  app.post('/Api/v1/WithdrawHistoryList/Search/', Security.rateLimiterMiddleware,Security.verifyToken, function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    let StartDate = req.body.StartDate;
    let EndDate = req.body.EndDate;
    WithdrawHistoryListSearch(Column,Value,StartDate,EndDate,res);
  });
  function WithdrawHistoryListLimitOffet(Limit,Offset,res){
    if (!isNullOrEmpty(Limit)) {
      if (!isNullOrEmpty(Offset)) {
        WithdrawHistoryListModel.Withdraw(Limit, Offset, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
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
  app.get('/Api/v1/WithdrawHistoryList/Limit/:Limit/Offset/:Offset', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    WithdrawHistoryListLimitOffet(Limit,Offset,res);
  });
  app.post('/Api/v1/WithdrawHistoryList/',Security.verifyToken, function (req, res) {
    let Limit = req.body.Limit;
    let Offset = req.body.Offset;
    WithdrawHistoryListLimitOffet(Limit,Offset,res);
  });
}
