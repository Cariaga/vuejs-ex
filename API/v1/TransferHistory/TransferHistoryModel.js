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

module.exports.TransferHistoryUserAccountIDReceiver = function TransferHistoryUserAccountIDReceiver(UserAccountIDReceiver, callback) {
  let query =
    `SET @UserAccountIDReceiver=${UserAccountIDReceiver};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });

}

module.exports.TransferHistoryUserAccountIDSender = function TransferHistoryUserAccountIDSender(UserAccountIDSender, callback) {
  let query =
    `SET @UserAccountIDSender=${UserAccountIDSender};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

module.exports.TransferHistoryTransferHistoryUUID = function TransferHistoryTransferHistoryUUID(TransferHistoryUUID, callback) {
  let query =
    `SET @TransferHistoryUUID=${TransferHistoryUUID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.TransferHistory.sync();
  let result = Models.TransferHistory.findAll({
    where: {
      TransferHistoryUUID: TransferHistoryUUID
    }
  }).then(function (result) {
    let Data = result.map(function (item) {
      return item;

    });
    if (Data.length > 0) {
      callback(Data);
    } else {
      callback(undefined);
    }
  }).catch(function (result) { //catching any then errors
    console.log("Error " + result);
    callback(undefined);
  });*/
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