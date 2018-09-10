var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.AddPlayerFinalCard = function AddPlayerFinalCard(UserAccountID, SeasonID, Rank, Score, Card, DateTime, BeforePoints, AfterPoints, WinPoints, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let _Rank = Rank;
    let _Score = Score;
    let _Card = Card;
    let _DateTime = DateTime;
    let _BeforePoints = BeforePoints;
    let _AfterPoints = AfterPoints;
    let _WinPoints = WinPoints;
    let query ="INSERT INTO `sampledb`.`playerfinalcard` (`UserAccountID`, `SeasonID`, `Rank`, `Score`, `Card`, `DateTime`, `BeforePoints`, `AfterPoints`, `WinPoints`) "+
    "VALUES ('"+_UserAccountID+"', '"+_SeasonID+"', '"+_Rank+"', '"+_Score+"', '"+_Card+"', '"+_DateTime+"', '"+_BeforePoints+"', '"+_AfterPoints+"', '"+_WinPoints+"');"
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });

}