var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');
module.exports.HandHistoryUserAccountID = function HandHistoryUserAccountID(UserAccountID,SeasonID,callback) {
  let _UserAccountID = UserAccountID;
  let _SeasonID = SeasonID;

  let query = "SELECT * FROM sampledb.handhistory where UserAccountID=\'"+_UserAccountID+"\' and SeasonID=\'"+_SeasonID+"\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.HandHistorySeasonID = function HandHistorySeasonID(SeasonID,callback) {
  let _SeasonID = SeasonID;

  let query = "SELECT * FROM sampledb.handhistory where SeasonID=\'"+_SeasonID+"\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
