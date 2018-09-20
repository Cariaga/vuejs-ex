let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let TransferHistoryModel = require("../TransferHistory/TransferHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
module.exports = function (app) { //MODIFY
  app.get('/Api/v1/TransferHistory/Update/TransferHistoryUUID/:TransferHistoryUUID/Status/:Status/', function (req, res) {
    let TransferHistoryUUID = req.params.TransferHistoryUUID;
    let Status = req.params.Status;
    if(!isNullOrEmpty(TransferHistoryUUID)){
      if(!isNullOrEmpty(Status)){
        TransferHistoryModel.TransferHistoryStatusUpdate(TransferHistoryUUID, Status, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            res.send([{
              TransferHistoryUpdateFailed: true
            }]);
          }
        });
      }
    }
  });
  //INSERT
  app.get('/Api/v1/TransferHistory/Add/UserAccountIDReceiver/:UserAccountIDReceiver/UserAccountIDSender/:UserAccountIDSender/Amount/:Amount/Reason/:Reason/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountIDReceiver = req.params.UserAccountIDReceiver;
    let UserAccountIDSender = req.params.UserAccountIDSender;
    let Amount = req.params.Amount;
    let Reason = req.params.Reason;
    if (!isNullOrEmpty(UserAccountIDReceiver)) {
      if (!isNullOrEmpty(UserAccountIDSender)) {
        if (!isNullOrEmpty(Amount)) {
          if (!isNullOrEmpty(Reason)) {
        
            TransferHistoryModel.RequestTransferHistory(UserAccountIDReceiver, UserAccountIDSender, Amount, Reason, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send([{
                  TransferHistoryUpdateFailed: true
                }]);
              }
            });
          } else {
            res.send({
              UserAccountIDSenderMissing: true
            })
          }
        } else {
          res.send({
            AmountMissing: true
          })
        }
      } else {
        res.send({
          ReasonMissing: true
        })
      }
    }
  });
  //SELECTION
   app.get('/Api/v1/TransferHistory/Search/Column/:Column/Value/:Value', function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;

    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        TransferHistoryModel.TransferHistorySearch(Column, Value, function (response) {
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