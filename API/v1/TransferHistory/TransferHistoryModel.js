var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.TransferHistoryAll = function TransferHistoryAll(callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.TransferHistory.sync();
  let result = Models.TransferHistory.findAll({
    where: {
      TransferHistoryID: {
        ne: null //not null
      }
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

module.exports.TransferHistoryUserAccountIDReceiver = function TransferHistoryUserAccountIDReceiver(UserAccountIDReceiver, callback) {
  let query =
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.TransferHistory.sync();
  let result = Models.TransferHistory.findAll({
    where: {
      UserAccountIDReceiver: UserAccountIDReceiver
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

module.exports.TransferHistoryUserAccountIDSender = function TransferHistoryUserAccountIDSender(UserAccountIDSender, callback) {
  let query =
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /* Models.TransferHistory.sync();
  let result = Models.TransferHistory.findAll({
    where: {
      UserAccountIDSender: UserAccountIDSender
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

module.exports.TransferHistoryTransferHistoryUUID = function TransferHistoryTransferHistoryUUID(TransferHistoryUUID, callback) {
  let query =
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
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
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
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
//*not implemented*
// if the player has points the player can add and subtract transfer to other player
//must update both the reciving/sender current player points 
// -------------------------- MIGRATED
module.exports.AddTransferHistory = function AddTransferHistory(TransferHistoryUUID, UserAccountIDReceiver, UserAccountIDSender, Amount, Status, Reason, TransferedDATE, callback) {
  let query =
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.TransferHistory.sync({
    alter: true 
  });
  var item1 = Models.TransferHistory.build({
    TransferHistoryUUID: TransferHistoryUUID,
    UserAccountIDReceiver: UserAccountIDReceiver,
    UserAccountIDSender: UserAccountIDSender,
    Amount: Amount,
    Status: Status,
    Reason: Reason,
    TransferedDATE: TransferedDATE
  });
  //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
  Models.TransferHistory.sync({ });
  item1.save()
    .then(Success => {

      console.log("----AddTransferHistory Start-----");
      console.log(Success);
      console.log("----AddTransferHistory End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log();
      callback(undefined);
    });*/
}