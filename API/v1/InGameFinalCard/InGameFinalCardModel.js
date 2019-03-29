
var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.AddPlayerFinalCard = function AddPlayerFinalCard(UserAccountID, SeasonID, Rank, Score, Card,CardsAtHand, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let _Rank = Rank;
    let _Score = Score;
    let _Card = Card;
    let _CardsAtHand = CardsAtHand;
    console.log("Card At Hand "+_CardsAtHand);
    let query = "INSERT INTO `sampledb`.`playerfinalcard` " +
    "SET UserAccountID = \'" + _UserAccountID + "\', SeasonID = \'" + _SeasonID + "\', `Rank` = \'" + _Rank + "\', Score = \'" + _Score + "\', Card = \'" + _Card + "\',DateTime=now(), CardAtHand='"+_CardsAtHand+"' ;";
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

    let query = "UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints`=\'"+_CurrentPoints+"\',`BeforePoints` = \'"+_BeforePoints+"\', `WinPoints` = \'"+_WinPoints+"\', `AfterPoints` = \'"+_AfterPoints+"\' WHERE (`SeasonID` = \'"+_SeasonID+"\' and `UserAccountID`=\'"+_UserAccountID+"\');";
    console.log("UpdatePlayerFinalCard "+query);
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });

  }
  module.exports.SeasonEnd = function SeasonEnd(SeasonID,callback){
    var _SeasonID = SeasonID;
    var query ="UPDATE `sampledb`.`playerfinalcard` SET `SeasonEnded` = now() WHERE (`SeasonID` = \'"+_SeasonID+"\');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });

  }
  //winning bet points  only
  //this has an equivelent query in HandHistoryModel but that one is For Deductions e.g DeductMoneyOnBet 
  //this one adds Player Points after the end of the game
  module.exports.UpdatePlayerMoney = function UpdatePlayerMoney(UserAccountID,WinPoints, callback) {
    let _UserAccountID = UserAccountID;
    let _WinPoints = parseInt(WinPoints);
    let query = "UPDATE `sampledb`.`players` SET `Money` = (select t.Money from (SELECT Money FROM sampledb.players as t where UserAccountID=\'"+_UserAccountID+"\' limit 1) as t)+"+_WinPoints+" WHERE (`UserAccountID` = \'"+_UserAccountID+"\');";
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
