var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.AddPlayerFinalCard = function AddPlayerFinalCard(UserAccountID, SeasonID, Rank, Score, Card, BeforePoints, AfterPoints, WinPoints, callback) {
  let _UserAccountID = UserAccountID;
  let _SeasonID = SeasonID;
  let _Rank = Rank;
  let _Score = Score;
  let _Card = Card;
  let _BeforePoints = parseInt(BeforePoints);
  let _AfterPoints = parseInt(AfterPoints);
  let _WinPoints = parseInt(WinPoints);
  let query = "INSERT INTO `sampledb`.`playerfinalcard` (`UserAccountID`, `SeasonID`, `Rank`, `Score`, `Card`,`DateTime`, `BeforePoints`, `AfterPoints`, `WinPoints`) " +
    "VALUES (\'" + _UserAccountID + "\', \'" + _SeasonID + "\', \'" + _Rank + "\', \'" + _Score + "\', \'" + _Card + "\', now(), \'" + _BeforePoints + "\', \'" + _AfterPoints + "\', \'" + _WinPoints + "\');"
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.AddPlayerFinalCard2 = function AddPlayerFinalCard2(UserAccountID, SeasonID, Rank, Score, Card, callback) {
  let _UserAccountID = UserAccountID;
  let _SeasonID = SeasonID;
  let _Rank = Rank;
  let _Score = parseInt(Score);
  let _Card = Card;
  let query = "INSERT INTO `sampledb`.`playerfinalcard` " +
  "SET UserAccountID = '" + _UserAccountID + "\', SeasonID = \'" + _SeasonID + "\', `Rank` = \'" + _Rank + "\', Score = \'" + _Score + "\', Card = \'" + _Card + "\';";
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
module.exports.UpdatePlayerFinalCard = function UpdatePlayerFinalCard(UserAccountID, SeasonID, BeforePoints, AfterPoints, WinPoints, callback) {
  let _UserAccountID = UserAccountID;
  let _SeasonID = SeasonID;
  let _BeforePoints = parseInt(BeforePoints);
  let _AfterPoints = parseInt(AfterPoints);
  let _WinPoints = parseInt(WinPoints);
  let query = "UPDATE `sampledb`.`playerfinalcard` SET `BeforePoints` = '" + _BeforePoints + "', `AfterPoints` = '" + _AfterPoints + "', `WinPoints` = '" + _WinPoints + "' WHERE (`UserAccountID` = \'" + _UserAccountID + "\' and `SeasonID`=\'" + _SeasonID + "\');";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}