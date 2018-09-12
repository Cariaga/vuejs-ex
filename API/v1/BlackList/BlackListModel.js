var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.BlackList = function BlackList(limit , offset, callback) {
  let _limit = limit;
  let _offset = offset;
  if(limit!=undefined&&_offset!=undefined){
    let query =
    "SELECT * FROM sampledb.player_Black_list limit "+_limit+" offset "+_offset;
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
  else if(limit!=undefined&&_offset!=undefined){
    let query =
    "SELECT * FROM sampledb.player_Black_list";
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

/**
 *
 *
 * @param {*} BlackListID
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} callback
 */
module.exports.BlackListStatusUpdate = function BlackListStatusUpdate(BlackListID, UserAccountID, Status, callback) {
  let _BlackListID = BlackListID;
  let _UserAccountID =UserAccountID;
  let _Status= Status;
  let query = 
  "UPDATE `sampledb`.`blacklist` "+
  "SET Status = '"+_Status+"', ReleaseDate=now()"+
  "WHERE BlackListID = "+_BlackListID+" and UserAccountID='"+_UserAccountID+"';"

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Title
 * @param {*} Status
 * @param {*} Reason
 * @param {*} ReportDate
 * @param {*} ReleaseDate
 * @param {*} callback
 */
module.exports.AddBlackList = function AddBlackList(UserAccountID, Title, Status, Reason, callback) {
  let _UserAccountID = UserAccountID;
let _Title = Title;
let _Status = Status;
let _Reason = Reason;
  let query =
  "INSERT INTO `sampledb`.`blacklist` (`UserAccountID`, `Status`, `Title`, `Reason`, `ReportDate`) "+
  "VALUES ('"+_UserAccountID+"','"+_Title+"','"+_Status+"','"+_Reason+"',now());";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });

  module.exports.BlacklistSearch = function BlacklistSearch(Column, Value, callback) {
    let _Column = Column;
    let _Value = Value;
    let query = 
    "SELECT * FROM sampledb.blacklist where "+_Column+" like '%"+_Value+"%';";
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