var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.Withdraw = function Withdraw(Limit, Offset, callback) {
  let _Limit = Limit;
  let _Offset = Offset;
  let query = 
  "SELECT * FROM sampledb.withdraw_list Limit "+_Limit+"  Offset "+_Offset+";";
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
module.exports.WithdrawSearch = function WithdrawSearch(Column, Value, callback) {
    let _Column = Column;
    let _Value = Value;
    let query = 
    "SELECT * FROM sampledb.withdraw_list where "+_Column+" like '%"+_Value+"%';";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
