let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let WithdrawHistoryListModel = require ('../WithdrawHistoryList/WithdrawHistoryListModel');
let http = require('http');
module.exports = function (app) {//SELECTION
  app.get('/Api/v1/WithdrawHistoryList/Search/Column/:Column/Value/:Value/StartDate/:StartDate/EndDate/:EndDate', function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    let StartDate = req.params.StartDate;
    let EndDate = req.params.EndDate;
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
  });

  app.get('/Api/v1/WithdrawHistoryList/Limit/:Limit/Offset/:Offset', function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;

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
  });
}
