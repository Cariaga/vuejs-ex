var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.InGameSeasonClear = function InGameSeasonClear(SeasonID, callback) {
    let _SeasonID = SeasonID;
    let query ="UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = '0' WHERE (`SeasonID` = '"+_SeasonID+"')";
    console.log(query);
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }
module.exports.AddGameHistory = function AddGameHistory( RoomID, SeasonID, callback) {
    let _RoomID = RoomID;
    let _SeasonID = SeasonID;
    let query =
      "INSERT INTO `sampledb`.`gamehistories` (`RoomID`, `SeasonID`, `GameStartedDateTime`) "+
      "VALUES ('"+_RoomID+"','"+_SeasonID+"',now());";
   
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
}