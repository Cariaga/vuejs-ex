var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");


module.exports.DepositList = function DepositList(limit, Offset, callback) {
  let _limit = limit;
  let _Offset = Offset;
  let query = "select * from deposit_list limit " + _limit + " Offset " + _Offset;
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      // console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.DepositList2 = function DepositList2(Limit,Offset,Order,Direction, callback) {
  let _Limit = Limit;
  let _Offset = Offset;
  let _Order = Order;
  let _Direction = Direction;
  let query = 
  "SELECT * FROM sampledb.deposit_list order by "+_Order+" "+_Direction+" limit "+_Limit+" Offset "+_Offset;
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      // console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.DepositSearch = function DepositSearch(Column, Value, StartDate, EndDate, callback) {
  let _Column = Column;
  let _Value = Value;
  let _StartDate = StartDate;
  let _EndDate = EndDate;
  let query =
    "SELECT * FROM sampledb.deposit_list DL where " + _Column + " like \'%" + _Value + "%\' and (DL.requesteddatetime BETWEEN \'" + _StartDate + "\' AND \'" + _EndDate + "\');";
    // console.log(query);
  DBConnect.DBConnect(query, function (response) {
    console.log(query)
    if (response != undefined) {
      // console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}