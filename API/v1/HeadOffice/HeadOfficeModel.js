var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Name
 * @param {*} Description
 * @param {*} callback
 */
module.exports.AddHeadOffice = function AddHeadOffice(UserAccountID, Name, Description, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Name=${Name};` +
    `SET @Description=${Description};` +
    "INSERT INTO `sampledb`.`headoffices` (`UserAccountID`, `Name`, `Description`, `CurrentPoints`) "+
    "VALUES (@UserAccountID, @Name, @Description, @CurrentPoints);";
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
 * @param {*} HeadOfficeID
 * @param {*} UserAccountID
 * @param {*} Name
 * @param {*} callback
 */
module.exports.HeadOfficeUpdate = function HeadOfficeUpdate(HeadOfficeID, UserAccountID, Name, callback) {
  let query =
    `SET @HeadOfficeID=${HeadOfficeID};` +
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Name=${Name};` +
    "UPDATE `sampledb`.`headoffices` "+
    "SET UserAccountID = @UserAccountID, Name = @Name, CurrentPoints = @CurrentPoints"+
    "WHERE HeadOfficeID = @HeadOfficeID;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.HeadOffice.update({
      UserAccountID: UserAccountID,
      Name: Name
    }, {
      where: {
        HeadOfficeID: HeadOfficeID
      }
    })
    .then(Success => {
      callback("Updated");
    })

    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });*/
}