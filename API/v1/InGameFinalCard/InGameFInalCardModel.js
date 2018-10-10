
var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.AddPlayerFinalCard = function AddPlayerFinalCard(UserAccountID, SeasonID, Rank, Score, Card, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let _Rank = Rank;
    let _Score = Score;
    let _Card = Card;
    let query = "INSERT INTO `sampledb`.`playerfinalcard` " +
    "SET UserAccountID = '" + _UserAccountID + "', SeasonID = '" + _SeasonID + "', `Rank` = '" + _Rank + "', Score = '" + _Score + "', Card = '" + _Card + "',DateTime=now();";
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
  module.exports.UpdatePlayerFinalCard = function UpdatePlayerFinalCard(UserAccountID,SeasonID,CurrentPoints,WinPoints,AfterPoints,BeforePoints, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let _CurrentPoints = CurrentPoints;
    let _WinPoints = WinPoints;
    let _AfterPoints = AfterPoints;
    let _BeforePoints = BeforePoints;

    let query = "UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints`='"+_CurrentPoints+"',`BeforePoints` = '"+_BeforePoints+"', `WinPoints` = '"+_WinPoints+"', `AfterPoints` = '"+_AfterPoints+"' WHERE (`SeasonID` = '"+_SeasonID+"' and `UserAccountID`='"+_UserAccountID+"');";
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