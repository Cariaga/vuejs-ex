var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');

module.exports.MemberListSearch = function MemberListSearch(Column, Value, callback) {
    let _Column = Column;
    let _Value = Value;
    let query = 
    "SELECT * FROM sampledb.member_list where "+_Column+" like '%"+_Value+"%';";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
module.exports.MemberListSearch = function MemberListSearch(Limit, Offset, callback) {
    let _Limit = Limit;
    let _Offset = Offset;
    let query = 
    "SELECT * FROM sampledb.member_list";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }