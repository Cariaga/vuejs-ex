let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let TransferHistoryModel = require("../TransferHistory/TransferHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { //MODIFY
  app.get('/Api/v1/TransferHistory/Update/TransferHistoryUUID/:TransferHistoryUUID/Status/:Status/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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
  
  function TransferHistoryListLimitOffsetOrder(Limit,Offset,Order,Direction,res){
    TransferHistoryModel.TransferHistoryList(Limit,Offset,Order,Direction, function(response){
      if(response!= undefined){
        res.send(response);
      }else{
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    })
  }
  // Security.cache.route({ expire: 5  })
  // list of transfer history with limit offset
  app.get('/Api/v1/TransferHistoryList/Limit/:Limit/Offset/:Offset/Order/:Order/Direction/:Direction', Security.verifyToken, Security.checkValues, Management.RouteCalled,Security.rateLimiterMiddleware, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    let Order = req.params.Order;
    let Direction = req.params.Direction;

    TransferHistoryListLimitOffsetOrder(Limit,Offset,Order,Direction,res);
  });


  //INSERT
  /*currently used in game but for maintainace use */
  /*adding of a new transfer specifying a user account id of both reciever and sender */
 /* app.get('/Api/v1/TransferHistory/Add/UserAccountIDReceiver/:UserAccountIDReceiver/UserAccountIDSender/:UserAccountIDSender/Amount/:Amount/Reason/:Reason/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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
  });*/
  //SELECTION
  app.get('/Api/v1/TransferHistoryList/Search/Column/:Column/Value/:Value/StartDate/:StartDate/EndDate/:EndDate', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    let StartDate = req.params.StartDate;
    let EndDate = req.params.EndDate;

    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        if (!isNullOrEmpty(StartDate)) {
          if (!isNullOrEmpty(EndDate)) {
            TransferHistoryModel.TransferSearch(Column, Value, StartDate, EndDate, function (response) {
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
  });
}