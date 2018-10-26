var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');


module.exports.AddHandHistory = function AddHandHistory(UserAccountID,SeasonID, MoveHand, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let _MoveHand = MoveHand;

  let query =
    "INSERT INTO `sampledb`.`handhistory` (`UserAccountID`, `SeasonID`, `MoveHand`, `HandDateTime`) "+
    "VALUES ('"+_UserAccountID+"','"+_SeasonID+"','"+_MoveHand+"', now());";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
module.exports.DeductMoneyOnBet = function DeductMoneyOnBet(UserAccountID,DeductAmount, callback) {
  let _UserAccountID = UserAccountID;
  let _DeductAmount = DeductAmount;
let query =
  "UPDATE `sampledb`.`players` SET `Money` = (select t.Money from (SELECT Money FROM sampledb.players as t where UserAccountID='"+_UserAccountID+"' limit 1) as t)-'"+_DeductAmount+"' WHERE (`UserAccountID` = 'Account8');";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.HandHistorySeasonID = function HandHistorySeasonID(SeasonID, callback) {
  let _SeasonID = SeasonID;
  let query = "SELECT * FROM sampledb.handhistory where SeasonID='"+_SeasonID+"';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.HandHistoryUserAccountID = function HandHistoryUserAccountID(UserAccountID, callback) {
  let _UserAccountID = UserAccountID;
  let query = "SELECT * FROM sampledb.handhistory where UserAccountID='"+_UserAccountID+"';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}