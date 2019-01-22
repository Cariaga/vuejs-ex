var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.TransferHistoryList = function TransferHistoryList(limit, Offset, callback) {
  let _limit = limit;
  let _Offset = Offset;
  let query = "select * from transferhistories_list limit " + _limit + " Offset " + _Offset;
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      // console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

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

module.exports.TransferSearch = function TransferSearch(Indexx, Value, StartDate, EndDate, callback) {
  let _Index = Indexx;
  let _Value = Value;
  let _StartDate = StartDate;
  let _EndDate = EndDate;
  let Column = ['USender','Sender','UReceiver','Receiver'];

  if(Indexx >= 0 && Indexx <= 3 ){
    let query =
      "SELECT * FROM sampledb.transferhistories_list where " +Column[_Index]  + " like \'%" + _Value + "%\' and (TransferedDateTime BETWEEN \'" + _StartDate + "\' AND \'" + _EndDate + "\');";
    DBConnect.DBConnect(query, function (response) {
      console.log(query)
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        console.log('transfer search failed')
        callback(undefined);
      }
    });
  }else{
    callback(undefined)
  }

}
module.exports.TransferHistoryStatusUpdate = function TransferHistoryStatusUpdate(TransferHistoryUUID, Status, callback) {
  let _TransferHistoryUUID = TransferHistoryUUID;
  let _Status = Status;
  let query = 
  "UPDATE `sampledb`.`transferhistories` SET `Status` = \'"+_Status+"\' WHERE (`TransferHistoryUUID` = \'"+_TransferHistoryUUID+"\');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
