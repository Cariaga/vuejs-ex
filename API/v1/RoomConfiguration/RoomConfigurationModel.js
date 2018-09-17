var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
var async = require("async");
let DBConnect = require("../../SharedController/DBConnect");

/**
 *
 *
 * @param {*} SeasonID
 * @param {*} SmallBlind
 * @param {*} BigBlind
 * @param {*} Speed
 * @param {*} callback
 */
module.exports.AddRoomConfiguration = function AddRoomConfiguration(RoomID, GameType, SmallBlind, BigBlind, Speed, callback) {
  let _RoomID = RoomID;
  let _GameType = GameType;
  let _SmallBlind = SmallBlind;
  let _BigBlind = BigBlind;
  let _Speed = Speed;
  let query =
    "INSERT INTO `sampledb`.`roomconfigurations` (`RoomID`, `SmallBlind`, `BigBlind`, `Speed`, `GameType`, `CreatedRoomDateTime`) " +
    "VALUES ('" + _RoomID + "', '" + _SmallBlind + "', '" + _BigBlind + "', '" + _Speed + "', '" + _GameType + "', now());";

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.RoomConfigurationRoomIDUpdateNotice = function RoomConfigurationRoomIDUpdateNotice(RoomID,RoomNotice, callback) {
  let _RoomID = RoomID;
  let _RoomNotice = RoomNotice;
  let query =
    "UPDATE `sampledb`.`roomconfigurations` SET `RoomNotice` = '"+_RoomNotice+"' WHERE (`RoomID` = '"+_RoomID+"');";
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
 * @param {*} RoomID
 * @param {*} SmallBlind
 * @param {*} BigBlind
 * @param {*} callback
 */
module.exports.RoomConfigurationRoomIDUpdateSmallBigBlind = function RoomConfigurationRoomIDUpdateSmallBigBlind(RoomID, GameType, SmallBlind, BigBlind, Speed, callback) {
  let _RoomID = RoomID;
  let _GameType = GameType;
  let _SmallBlind = SmallBlind;
  let _BigBlind = BigBlind;
  let _Speed = Speed; 
  let query =
    "UPDATE `sampledb`.`roomconfigurations` " +
    "SET SmallBlind = " + _SmallBlind + ", BigBlind = " + _BigBlind + ", Speed = " + _Speed + ", GameType = " + _GameType + "," +
    "WHERE RoomID = " + _RoomID + "";

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
 * @param {*} callback
 */
module.exports.RoomConfiguration = function RoomConfiguration(callback) {
  let query = '';

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.RoomConfigurationRoomNotice = function RoomConfigurationRoomNotice(RoomID, RoomNotice, callback) {
  let _RoomID = RoomID;
  let _RoomNotice = RoomNotice;
  let query =
    "UPDATE `sampledb`.`roomconfigurations`" +
    "SET RoomNotice = " + _RoomNotice + "" +
    "WHERE RoomID = " + _RoomID + "";

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}