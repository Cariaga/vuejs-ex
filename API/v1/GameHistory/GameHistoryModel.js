var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} RoundID
 * @param {*} SeasonID
 * @param {*} Rank
 * @param {*} Score
 * @param {*} Card
 * @param {*} Time
 * @param {*} Date
 * @param {*} BeforePoints
 * @param {*} AfterPoints
 * @param {*} callback
 */
module.exports.AddGameHistory = function AddGameHistory( RoundID, SeasonID, callback) {
  let _RoundID = RoundID;
  let _SeasonID = SeasonID;
  let query =
    "INSERT INTO `sampledb`.`gamehistories` (`RoomID`, `SeasonID`, `GameStartedDateTime`) "+
    "VALUES (\'"+_RoundID+"\',\'"+_SeasonID+"\',now());";
 
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
module.exports.GameHistory = function GameHistory(callback) {
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