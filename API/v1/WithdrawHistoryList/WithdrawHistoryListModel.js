var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.Withdraw = function Withdraw(Limit,Offset,Order,Direction, callback) {
  let _Limit = Limit;
  let _Offset = Offset;
  let _Order = Order;
  let _Direction = Direction;
  let query =
    "SELECT * FROM sampledb.withdraw_list order by "+_Order+" "+_Direction+" Limit " + _Limit + "  Offset " + _Offset + ";";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

//SELECT * FROM sampledb.withdraw_list where UserAccountID like '%%';
module.exports.WithdrawSearch = function WithdrawSearch(Column, Value, StartDate, EndDate, callback) {
  let _Column = Column;
  let _Value = Value;
  let _StartDate = StartDate;
  let _EndDate = EndDate;
  let query =
    "SELECT * FROM sampledb.withdraw_list as WD where " + _Column + " like \'%" + _Value + "%\' and (WD.RequestedDateTime BETWEEN \'" + _StartDate + "\' AND \'" + _EndDate + "\');";
    DBConnect.DBConnect(query, function (response) {
      console.log('this is the response : '+response)
      // if (response != undefined) {
      //   console.log(response);
      //   callback(response);
      // } else {
      //   callback(undefined);
      // }
    });
}