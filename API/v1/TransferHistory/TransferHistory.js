let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let TransferHistoryModel = require("../TransferHistory/TransferHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
module.exports = function (app) {//MODIFY
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
  //SELECTION
  app.get('/Api/v1/TransferHistory/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.TransferHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      TransferHistoryModel.TransferHistoryAll(function (response) {
        if (response != undefined) {
          res.send(beautify(response, null, 2, 100));
        } else {
          res.send([]);
        }
      });

    }
    if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {

    }
    if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {

    }
    if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {

    }
    if (isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {

    }
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {

    }
    if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {

    }
  });

      //Transaction list of a player not to be confued with TransferHistory between players
//NOT A TRASFER HISTORY but a transactions performed on and by the PLAYER to SELF Account
app.get('/Api/v1/TransactionList/UserAccountID/:UserAccountID/', function (req, res) { //A combination of Deposit and Withdraw List in one request but for the player its self
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID = req.params.UserAccountID;
  let PhoneNumber = req.param.PhoneNumber;
  let TelephoneNumber = req.param.TelephoneNumber;
  let UserAccountIDExist = false;
  let UserInfoExist = false;
  let PlayerExist = false;
  let ScreenName = undefined;
  let Name = undefined;
  let PlayerRelationshipResult = undefined;
  let WithdrawHistoryExist = false;
  let WithdrawHistoryResult = undefined; //empty array if no history but should not be undefined and still output
  let DepositHistoryExist = false;
  let DepositHistoryResult = undefined; //empty array if no history but should not be undefined and still output
  if (!isNullOrEmpty(UserAccountID)) {
    async.series([UserAccountCheck, UserInfoCheck, PlayerCheck, GetParentPlayerLookUp, GetWithdrawHistory, GetDepositHistory], function (error, response) {
      let WithdrawListItem = PlayerRelationshipResult;
      WithdrawListItem.PhoneNumber = PhoneNumber;
      WithdrawListItem.TelephoneNumber = TelephoneNumber;
      WithdrawListItem.Name = Name;
      WithdrawListItem.ScreenName = ScreenName;
      WithdrawListItem.WithdrawHistory = WithdrawHistoryResult;
      WithdrawListItem.DepositHistory = DepositHistoryResult;

      res.send(beautify(WithdrawListItem, null, 2, 100));
    });

    function UserAccountCheck(callback) {
      DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
        if (response != undefined) {
          UserAccountIDExist = true;
          callback(null, '1');
        } else {
          UserAccountIDExist = false;
          callback(null, '1');
        }
      });
    }

    function UserInfoCheck(callback) {
      DBCheck.UserInfoUserAccountID(UserAccountID, function (response) {
        if (response != undefined) {
          UserInfoExist = true;
          PhoneNumber = response[0].PhoneNumber;
          TelephoneNumber = response[0].TelephoneNumber;
          callback(null, '2');
        } else {
          UserInfoExist = false;
          callback(null, '2');
        }
      });
    }

    function PlayerCheck(callback) {
      DBCheck.PlayerUserAccountID(UserAccountID, function (response) {
        if (response != undefined) {
          PlayerExist = true;
          Name = response[0].Name;
          ScreenName = response[0].ScreenName;
          callback(null, '3');
        } else {
          PlayerExist = false;
          callback(null, '3');
        }
      });
    }

    function GetParentPlayerLookUp(callback) {
      DBCheck.GetParentRelationshipPlayerUserAccountID(UserAccountID, function (response) {
        if (response != undefined) {
          PlayerRelationshipResult = response;
          callback(null, '4');
        } else {
          PlayerRelationshipResult = undefined;
          callback(null, '4');
        }
      });
    }

    function GetWithdrawHistory(callback) {
      WithdrawHistoryUserAccountID(UserAccountID, function (response) {
        if (response != undefined) {
          WithdrawHistoryResult = response;
          WithdrawHistoryExist = true;
          callback(null, '5');
        } else {
          WithdrawHistoryResult = []; // THIS  is valid because we want to return empty if no result
          WithdrawHistoryExist = false;
          callback(null, '5');
        }
      });
    }

    function GetDepositHistory(callback) {
      DepositHistoryUserAccountID(UserAccountID, function (response) {
        if (response != undefined) {
          DepositHistoryResult = response;
          DepositHistoryExist = true;
          callback(null, '6');
        } else {
          DepositHistoryResult = []; // THIS is valid because we want to return empty if no result
          DepositHistoryExist = false;
          callback(null, '6');
        }
      });
    }
  } else {
    res.send({
      UserAccountIDMissing: true
    });
  }
});

  app.get('/Api/v1/TransferHistory/UserAccountSentAndRecievedID/:UserAccountSentAndRecievedID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountSentAndRecievedID = req.params.UserAccountSentAndRecievedID;
    let SentTransferResult = undefined;
    let RecievedTransferResult = undefined;

    async.series([GetSentTransfer, GetReceiverTransfer], function (error, response) {
      let FullTransferHistory = {
        SentTransferResult: SentTransferResult,
        RecievedTransferResult: RecievedTransferResult
      };

      res.send(FullTransferHistory);
    });

    function GetSentTransfer(callback1) {
      TransferHistoryModel.TransferHistoryUserAccountIDSender(UserAccountSentAndRecievedID, function (response1) {
        if (response1 != undefined) {
          SentTransferResult = response1;
          callback1(null, '1');
        } else {
          SentTransferResult = [];
          callback1(null, '1');
        }

      });
    }

    function GetReceiverTransfer(callback2) {
      TransferHistoryModel.TransferHistoryUserAccountIDReceiver(UserAccountSentAndRecievedID, function (response) {
        if (response != undefined) {
          RecievedTransferResult = response;
          callback2(null, '2');
        } else {
          RecievedTransferResult = [];
          callback2(null, '2');
        }
      });
    }
  });
  app.get('/Api/v1/TransferHistory/UserAccountIDReceiver/:UserAccountIDReceiver/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountIDReceiver = req.params.UserAccountIDReceiver;
    if (!isNullOrEmpty(UserAccountIDReceiver)) {
      TransferHistoryModel.TransferHistoryUserAccountIDReceiver(UserAccountIDReceiver, function (response) {
        if (response != undefined) {
          res.send(beautify(response, null, 2, 100));
        } else {
          res.send([]);
        }
      });
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  app.get('/Api/v1/TransferHistory/UserAccountSentAndRecievedID/:UserAccountSentAndRecievedID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountSentAndRecievedID = req.params.UserAccountSentAndRecievedID;
    let SentTransferResult = undefined;
    let RecievedTransferResult = undefined;

    async.series([GetSentTransfer, GetReceiverTransfer], function (error, response) {
      let FullTransferHistory = {
        SentTransferResult: SentTransferResult,
        RecievedTransferResult: RecievedTransferResult
      };

      res.send(FullTransferHistory);
    });

    function GetSentTransfer(callback1) {
      TransferHistoryModel.TransferHistoryUserAccountIDSender(UserAccountSentAndRecievedID, function (response1) {
        if (response1 != undefined) {
          SentTransferResult = response1;
          callback1(null, '1');
        } else {
          SentTransferResult = [];
          callback1(null, '1');
        }

      });
    }

    function GetReceiverTransfer(callback2) {
      TransferHistoryModel.TransferHistoryUserAccountIDReceiver(UserAccountSentAndRecievedID, function (response) {
        if (response != undefined) {
          RecievedTransferResult = response;
          callback2(null, '2');
        } else {
          RecievedTransferResult = [];
          callback2(null, '2');
        }
      });
    }
  });
}
module.exports = function (app) {//INSERT
  app.get('/Api/v1/TransferHistory/Add/UserAccountIDReceiver/:UserAccountIDReceiver/UserAccountIDSender/:UserAccountIDSender/Amount/:Amount/Status/:Status/Reason/:Reason/TransferedDATE/:TransferedDATE/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let TransferHistoryUUID = uuidv4();
    let UserAccountIDReceiver = req.params.UserAccountIDReceiver;
    let UserAccountIDSender = req.params.UserAccountIDSender;
    let Amount = req.params.Amount;
    let Status = req.params.Status;
    let Reason = req.params.Reason;
    let TransferedDATE = req.params.TransferedDATE;
    if (!isNullOrEmpty(UserAccountIDReceiver)) {
      if (!isNullOrEmpty(UserAccountIDSender)) {
        if (!isNullOrEmpty(Amount)) {
          if (!isNullOrEmpty(Status)) {
            if (!isNullOrEmpty(Reason)) {
              if (!isNullOrEmpty(TransferedDATE)) {
                if (parseInt(Amount) > 0) {
                  let UserAccountIDReceiverExist = false;
                  let UserAccountIDSenderExist = false;
                  async.series([UserAccountIDReceiverExistCheck, UserAccountIDSenderExistCheck], function (error, response) {
                    if (UserAccountIDReceiverExist == true) {
                      if (UserAccountIDSenderExist == true) {
                        TransferHistoryModel.AddTransferHistory(TransferHistoryUUID, UserAccountIDReceiver, UserAccountIDSender, Amount, Status, Reason, TransferedDATE, function (response) {
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
                          UserAccountIDSenderExist: false
                        });
                      }
                    } else {
                      res.send({
                        UserAccountIDReceiverExist: false
                      });
                    }
                  });

                  function UserAccountIDReceiverExistCheck(callback) {
                    DBCheck.isUserAccountIDExist(UserAccountIDReceiver, function (response) {
                      if (response != null) {
                        UserAccountIDReceiverExist = true;
                        callback(null, '1');
                      } else {
                        UserAccountIDReceiverExist = false;
                        callback(null, '1');
                      }
                    });
                  }

                  function UserAccountIDSenderExistCheck(callback) {
                    DBCheck.isUserAccountIDExist(UserAccountIDSender, function (response) {
                      if (response != null) {
                        UserAccountIDSenderExist = true;
                        callback(null, '2');
                      } else {
                        UserAccountIDSenderExist = false;
                        callback(null, '2');
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
  });
  //STRUCTURE
  app.get('/Api/v1/TransferHistory/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.TransferHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.TransferHistory.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}

