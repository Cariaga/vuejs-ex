var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.TransferHistory = function TransferHistory(Limit,Offset,callback) {
  let _Limit = Limit;
  let _Offset =Offset;
  if(Limit!=undefined&&Offset!=undefined){
    let query = "SELECT * FROM sampledb.transferhistories limit "+_Limit+" offset "+_Offset;
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
  if(Limit==undefined&&Offset==undefined){
    let query = "SELECT * FROM sampledb.transferhistories";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
}

module.exports.TransferSearch = function TransferSearch(Column, Value, StartDate, EndDate, callback) {
  let _Column = Column;
  let _Value = Value;
  let _StartDate = StartDate;
  let _EndDate = EndDate;
  let query =
    "SELECT * FROM sampledb.transferhistories as TH where " + _Column + " like \'%" + _Value + "%\' and (TH.TransferedDateTime BETWEEN \'" + _StartDate + "\' AND \'" + _EndDate + "\');";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.TransferHistoryStatusUpdate = function TransferHistoryStatusUpdate(TransferHistoryUUID, Status, callback) {
  let _TransferHistoryUUID = TransferHistoryUUID;
  let _Status = Status;
  let query = 
  "UPDATE `sampledb`.`transferhistories` SET `Status` = '"+_Status+"' WHERE (`TransferHistoryUUID` = \'"+_TransferHistoryUUID+"\');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
