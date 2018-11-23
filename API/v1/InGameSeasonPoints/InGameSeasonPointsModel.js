var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
//SELECT ScreenName FROM sampledb.players where UserAccountID='Account8';

  module.exports.InGameSeasonPoints = function InGameSeasonPoints(SeasonID, callback) {
      let _SeasonID = SeasonID;
      let query ="SELECT UserAccountID,SeasonID,CurrentPoints FROM sampledb.playerfinalcard where SeasonID=\'"+_SeasonID+"\';";
      console.log(query);
      DBConnect.DBConnect(query, function (response) {
        //console.log(response);
          if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
        });
  }

  //won points
    //UPDATE `sampledb`.`playerfinalcard` SET `WinPoints` = '500' WHERE (`SeasonID` = '0e032ae4-335b-4889-808e-3ff95e4cf7f4' and `UserAccountID`='Account8');
  module.exports.InGameSeasonPointsWon = function InGameSeasonPointsWon(SeasonID, UserAccountID, WinPoints, callback) {
      let _SeasonID = SeasonID;
      let _UserAccountID = UserAccountID;
      let _WinPoints = parseInt(WinPoints);
      let query ="UPDATE `sampledb`.`playerfinalcard` SET `WinPoints` = '"+_WinPoints+"' WHERE (`SeasonID` = \'"+_SeasonID+"\' and `UserAccountID`=\'"+_UserAccountID+"\')";
      console.log(query);
      DBConnect.DBConnect(query, function (response) {
        //console.log(response);
          if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
        });
  }

  //before points
    //UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = '0' WHERE (`SeasonID` = '0e032ae4-335b-4889-808e-3ff95e4cf7f4' and UserAccountID='Account8' and SeasonEnded is null);
  module.exports.InGameSeasonPointsJoin = function InGameSeasonPointsJoin(SeasonID, UserAccountID, BeforePoints, callback) {
      let _SeasonID = SeasonID;
      let _UserAccountID = UserAccountID;
      let _BeforePoints = parseInt(BeforePoints);
      
      let query ="UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = '"+_BeforePoints+"' WHERE (`SeasonID` = \'"+_SeasonID+"\' and UserAccountID=\'"+_UserAccountID+"\' and SeasonEnded is null);";
      // let query ="UPDATE `sampledb`.`playerfinalcard` SET `BeforePoints` = '"+_BeforePoints+"' WHERE (`SeasonID` = '"+_SeasonID+"' and `UserAccountID`= '"+_UserAccountID+"');";
      console.log(query);
      DBConnect.DBConnect(query, function (response) {
        //console.log(response);
          if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
        });
  }
  
  //buy in
    //UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = '0' WHERE (`SeasonID` = '0e032ae4-335b-4889-808e-3ff95e4cf7f4' and UserAccountID='Account8' and SeasonEnded is null);
  module.exports.InGameSeasonPointsBuyIn = function InGameSeasonPointsBuyIn(SeasonID, UserAccountID, CurrentPoints, callback) {
      let _SeasonID = SeasonID;
      let _UserAccountID = UserAccountID;
      let _CurrentPoints = CurrentPoints;
      let query ="UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = '"+_CurrentPoints+"' WHERE (`SeasonID` = \'"+_SeasonID+"\' and UserAccountID= \'"+_UserAccountID+"\' and SeasonEnded is null);";
      console.log(query);
      DBConnect.DBConnect(query, function (response) {
        //console.log(response);
          if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
        });
  }

  //seasonEnd
    //UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = '0', `SeasonEnded` = now() WHERE (`SeasonID` = '0e032ae4-335b-4889-808e-3ff95e4cf7f4');
  module.exports.InGameSeasonPointsEnd = function InGameSeasonPointsEnd(SeasonID, callback) {
      let _SeasonID = SeasonID;
 
      let query ="UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = 0, `SeasonEnded` = now() WHERE (`SeasonID` = \'"+_SeasonID+"\');";
      console.log(query);
      DBConnect.DBConnect(query, function (response) {
        //console.log(response);
          if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
        });
  }