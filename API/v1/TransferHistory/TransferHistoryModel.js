var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.TransferHistory = function TransferHistory(callback) {
  let query = '';
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.TransferHistorySearch = function TransferHistorySearch(Column,Value,callback){
  let query = "SELECT * FROM sampledb.transferhistories "+
  "WHERE "+Column+" = '"+Value+"';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.TransferHistoryUpdate = function TransferHistoryUpdate(TransferHistoryUUID, UserAccountIDReceiver, UserAccountIDSender, Amount, Status, Reason, TransferedDATE, callback) {
  let query =
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /* Models.TransferHistory.update({
      UserAccountIDReceiver: UserAccountIDReceiver,
      UserAccountIDSender: UserAccountIDSender,
      Amount: Amount,
      Status: Status,
      Reason: Reason,
      TransferedDATE: TransferedDATE,
    }, {
      where: {
        TransferHistoryUUID: TransferHistoryUUID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " + error);
      callback(undefined);
    });*/
}
module.exports.TransferHistoryStatusUpdate = function TransferHistoryStatusUpdate(TransferHistoryUUID, Status, callback) {
  let _TransferHistoryUUID = TransferHistoryUUID;
  let _Status = Status;
  let query = 
  "UPDATE `sampledb`.`transferhistories` SET `Status` = '"+_Status+"' WHERE (`TransferHistoryUUID` = '"+_TransferHistoryUUID+"');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /* Models.TransferHistory.update({
      UserAccountIDReceiver: UserAccountIDReceiver,
      UserAccountIDSender: UserAccountIDSender,
      Amount: Amount,
      Status: Status,
      Reason: Reason,
      TransferedDATE: TransferedDATE,
    }, {
      where: {
        TransferHistoryUUID: TransferHistoryUUID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " + error);
      callback(undefined);
    });*/
}
// if the player has points the player can add and subtract transfer to other player
//must update both the reciving/sender current player points 
module.exports.RequestTransferHistory = function RequestTransferHistory(UserAccountIDReceiver, UserAccountIDSender, Amount, Reason,callback) {
  let _UserAccountIDReceiver = UserAccountIDReceiver;
  let _UserAccountIDSender = UserAccountIDSender;
  let _Amount = Amount;
  let _Reason = Reason;
  let query = 
  "INSERT INTO `sampledb`.`transferhistories` (`TransferHistoryUUID`, `UserAccountIDReceiver`, `UserAccountIDSender`, `Amount`, `Status`, `Reason`, `TransferedDateTime`) "+
  "VALUES (UUID(),'"+_UserAccountIDReceiver+"','"+_UserAccountIDSender+"','"+_Amount+"','pending','"+_Reason+"',now()) ";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}