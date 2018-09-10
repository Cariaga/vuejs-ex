let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let TransferHistoryModel = require("../TransferHistory/TransferHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
module.exports = function (app) { //MODIFY

  app.get('/Api/v1/TransferHistory/Update/TransferHistoryUUID/:TransferHistoryUUID/Status/:Status', function (req, res) {
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
  app.get('/Api/v1/TransferHistory/Update/TransferHistoryUUID/:TransferHistoryUUID/UserAccountIDReceiver/:UserAccountIDReceiver/UserAccountIDSender/:UserAccountIDSender/Amount/:Amount/Status/:Status/Reason/:Reason/TransferedDATE/:TransferedDATE/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let TransferHistoryUUID = req.params.TransferHistoryUUID;
    let UserAccountIDReceiver = req.params.UserAccountIDReceiver;
    let UserAccountIDSender = req.params.UserAccountIDSender;
    let Amount = req.params.Amount;
    let Status = req.params.Status;
    let Reason = req.params.Reason;
    let TransferedDATE = req.params.TransferedDATE;
    if (!isNullOrEmpty(TransferHistoryUUID)) {
      if (!isNullOrEmpty(UserAccountIDReceiver)) {
        if (!isNullOrEmpty(UserAccountIDSender)) {
          if (!isNullOrEmpty(Amount)) {
            if (!isNullOrEmpty(Status)) {
              if (!isNullOrEmpty(Reason)) {
                if (!isNullOrEmpty(TransferedDATE)) {
                  if (Amount >= 0) {
                    let TransferHistoryUUIDExist = false;
                    async.series([TransferHistoryUUIDExistCheck], function (error, response) {
                      if (TransferHistoryUUIDExist == true) {
                        TransferHistoryModel.TransferHistoryUpdate(TransferHistoryUUID, UserAccountIDReceiver, UserAccountIDSender, Amount, Status, Reason, TransferedDATE, function (response) {
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
                          TransferHistoryUUIDExist: false
                        });
                      }
                    });

                    function TransferHistoryUUIDExistCheck(callback) {
                      TransferHistoryModel.TransferHistoryTransferHistoryUUID(TransferHistoryUUID, function (response) {
                        console.log(response);
                        if (response != undefined) {
                          TransferHistoryUUIDExist = true;
                          callback(null, '1');
                        } else {
                          TransferHistoryUUIDExist = false;
                          callback(null, '1');
                        }
                      });
                    }
                  } else {
                    res.send({
                      AmountInvalidValue: true
                    });
                  }

                } else {
                  res.send({
                    TransferedDATEMissing: true
                  });
                }
              } else {
                res.send({
                  ReasonMissing: true
                });
              }
            } else {
              res.send({
                StatusMissing: true
              });
            }
          } else {
            res.send({
              AmountMissing: true
            });
          }
        } else {
          res.send({
            UserAccountIDSenderMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDReceiverMissing: true
        });
      }
    } else {
      res.send({
        TransferHistoryUUIDMissing: true
      });
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
  app.get('/Api/v1/TransferHistory/', function (req, res) {
      
  });
}