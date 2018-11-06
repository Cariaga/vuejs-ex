var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} ShopID
 * @param {*} ScreenName
 * @param {*} Name
 * @param {*} Surname
 * @param {*} CurrentRoomName
 * @param {*} callback
 */
/*
module.exports.AddPlayer = function AddPlayer(UserAccountID, ShopID, ScreenName, Name, Surname, CurrentRoomName, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @ShopID=${ShopID};` +
    `SET @ScreenName=${ScreenName};` +
    `SET @Name=${Name};` +
    `SET @Surname=${Surname};` +
    `SET @CurrentRoomName=${CurrentRoomName};` +
    "INSERT INTO `sampledb`.`players` (`UserAccountID`, `ShopID`, `ScreenName`, `Name`, `Surname`, `CurrentRoomName`, `CurrentPoints`) "+
    "VALUES (@UserAccountID, @ShopID, @ScreenName, @Name, @Surname, @CurrentRoomName, @CurrentPoints)"
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
*/
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
/*
module.exports.PlayerUserAccountID = function PlayerUserAccountID(UserAccountID, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} CurrentPoints
 * @param {*} callback
 */
/*
module.exports.PlayerUpdatePoint = function PlayerUpdatePoint(UserAccountID, CurrentPoints, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @CurrentPoints=${CurrentPoints};` +
    "UPDATE `sampledb`.`players` "+
    "SET CurrentPoints = @CurrentPoints "+
    "WHERE UserAccountID = @UserAccountID;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} CurrentRoomName
 * @param {*} callback
 */
/*
module.exports.PayerUpdateRoomName = function PayerUpdateRoomName(UserAccountID, CurrentRoomName, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @CurrentRoomName=${CurrentRoomName};` +
    "UPDATE `sampledb`.`players`"+
    "SET CurrentRoomName = @CurrentRoomName "+
    "WHERE UserAccountID = @UserAccountID;";

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
*/
/*
module.exports.PlayerUpdate = function PlayerUpdate(PlayersID, UserAccountID, ShopID, ScreenName, Name, Surname, CurrentRoomName, callback) {
  let query =
    `SET @PlayersID=${PlayersID};` +
    `SET @UserAccountID=${UserAccountID};` +
    `SET @ShopID=${ShopID};` +
    `SET @ScreenName=${ScreenName};` +
    `SET @Name=${Name};` +
    `SET @Surname=${Surname};` +
    `SET @CurrentRoomName=${CurrentRoomName};` +
    "UPDATE `sampledb`.`players` "+
    "SET ShopID = @ShopID, ScreenName = @ScreenName, Name = @Name, Surname = @Surname, CurrentRoomName = @CurrentRoomName"+
    "WHERE PlayersID = @PlayersID and UserAccountID = @UserAccountID;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} ShopID
 * @param {*} ScreenName
 * @param {*} Name
 * @param {*} Surname
 * @param {*} CurrentRoomName
 * @param {*} callback
 */
/*
module.exports.AddPlayer = function AddPlayer(UserAccountID, ShopID, ScreenName, Name, Surname, CurrentRoomName, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @ShopID=${ShopID};` +
    `SET @ScreenName=${ScreenName};` +
    `SET @Name=${Name};` +
    `SET @Surname=${Surname};` +
    `SET @CurrentRoomName=${CurrentRoomName};` +
    "INSERT INTO `sampledb`.`players` (`UserAccountID`, `ShopID`, `ScreenName`, `Name`, `Surname`, `CurrentRoomName`) "+
    "VALUES (@UserAccountID, @ShopID, @ScreenName, @Name, @Surname, @CurrentRoomName);"
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/

module.exports.PlayerInformation = function PlayerInformation(UserAccountID, callback) {
  let query ="SELECT UserAccountID,ScreenName,Name,Surname,CurrentRoomName,CurrentPoints FROM sampledb.players where UserAccountID=\'"+UserAccountID+"\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      callback(response);
    } else {
      callback(undefined);
    }
  });
};