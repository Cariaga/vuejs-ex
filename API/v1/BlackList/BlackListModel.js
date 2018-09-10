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
  let query =
    "SELECT * FROM sampledb.useraccount_blacklist limit "+_limit+" offset "+_offset;
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
 * @param {*} Description
 * @param {*} ReportDate
 * @param {*} ReleaseDate
 * @param {*} callback
 */
module.exports.AddBlackList = function AddBlackList(UserAccountID, Title, Status, Description, ReportDate, ReleaseDate, callback) {
  let _UserAccountID = UserAccountID;
let _Title = Title;
let _Status = Status;
let _Description = Description;
let _ReportDate = ReportDate;
let _ReleaseDate = ReleaseDate;
  let query =
  "INSERT INTO `sampledb`.`blacklist` (`UserAccountID`, `Status`, `Title`, `Description`, `ReportDate`, `ReleaseDate`) "+
  "VALUES ('"+_UserAccountID+"','"+_Title+"','"+_Status+"','"+_Description+"','"+_ReportDate+"','"+_ReleaseDate+"');";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}