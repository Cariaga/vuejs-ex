var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");

//select
module.exports.BlackList = function BlackList(limit , offset, callback) {
  let _limit = limit;
  let _offset = offset;
  if(limit!=undefined&&_offset!=undefined){
    // select player_black_list where select only the latest black list id of the user (with limit and offset)
    let query =
    "SELECT BlackListID, HeadOfficeID, DistributorID, ShopID, UserAccountID, ScreenName, RegisteredDateTime, ReleaseDate, Reason, Status"
    +" FROM sampledb.player_Black_list"
    +" WHERE BlackListID IN ( SELECT MAX(BlackListID) FROM player_Black_list GROUP BY UserAccountID)"
    +" limit "+_limit+" offset "+_offset;
    console.log(query)
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
    "SELECT BlackListID, HeadOfficeID, DistributorID, ShopID, UserAccountID, ScreenName, RegisteredDateTime, ReleaseDate, Reason FROM sampledb.player_Black_list";
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

 //Released
module.exports.BlackListStatusUpdate = function BlackListStatusUpdate(BlackListID, UserAccountID, callback) {
  let _BlackListID = BlackListID;
  let _UserAccountID =UserAccountID;
  let query = 
  "UPDATE `sampledb`.`blacklist` "+
  " SET Status = 'Released', ReleaseDate=now()"+
  " WHERE BlackListID = "+_BlackListID+" and UserAccountID='"+_UserAccountID+"';"

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
 * @param {*} callback
 */


module.exports.AddBlackList = function AddBlackList(UserAccountID, Reason, callback) {
  let _UserAccountID = UserAccountID;
  let _Reason = Reason;
  let query =
  "INSERT INTO `sampledb`.`blacklist` (`UserAccountID`, `Status`, `Reason`, `ReportDate`) "+
  "VALUES ('"+_UserAccountID+"' ,'Blocked',  '"+_Reason+"',now());";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.BlacklistSearch = function BlacklistSearch(Column, Value, callback) {
  let _Column = Column;
  let _Value = Value;
  let query = "SELECT BlackListID, HeadOfficeID, DistributorID, ShopID, UserAccountID, ScreenName, RegisteredDateTime, ReleaseDate, Reason, Status"
  +" FROM player_Black_list"
  +" WHERE BlackListID IN (SELECT MAX(BlackListID)"
  +" FROM player_Black_list"
  +" GROUP BY UserAccountID)"
  +" AND "+_Column+" like '%"+_Value+"%';";

  console.log(query)
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}