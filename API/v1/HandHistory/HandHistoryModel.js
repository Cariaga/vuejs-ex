var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.HandHistoryUpdate = function HandHistoryUpdate(HandHistoryID, UserAccountID, MoveHand, SeasonID, callback) {
  let query =
    `SET @HandHistoryID=${HandHistoryID};` +
    `SET @UserAccountID=${UserAccountID};` +
    `SET @MoveHand=${MoveHand};` +
    `SET @SeasonID=${SeasonID};` +
    `SET @HandDateTime=` +

    "UPDATE `sampledb`.`handhistory`"+
    "SET SeasonID = @SeasonID, MoveHand = @MoveHand, HandDateTime = @HandDateTime"+
    "WHERE HandHistoryID = @HandHistoryID and UserAccountID = @UserAccountID"
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.HandHistory.sync();
  Models.HandHistory.update({
      MoveHand: MoveHand,
      RoundID: RoundID
    }, {
      where: {
        HandHistoryID: HandHistoryID,
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      console.log("Updated");
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });*/
}
module.exports.AddHandHistory = function AddHandHistory(UserAccountID,SeasonID, MoveHand, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @MoveHand=${MoveHand};` +
    `SET @SeasonID=${SeasonID};` +
    "INSERT INTO `sampledb`.`handhistory` (`UserAccountID`, `SeasonID`, `MoveHand`, `HandDateTime`) "+
    "VALUES (@UserAccountID, @SeasonID, @MoveHand, @HandDateTime);";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.HandHistory.sync();
  var item1 = Models.HandHistory.build({
    UserAccountID: UserAccountID,
    MoveHand: MoveHand,
    RoundID: RoundID
  });
  Models.HandHistory.sync(); //only use force true if you want to destroy replace table
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {

      console.log("error inserting " + error);
      callback(undefined);
    });*/
}