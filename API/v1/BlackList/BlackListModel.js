var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.BlackListUserAccountID = function BlackListUserAccountID(UserAccountID, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    ""+
    ""+
    ""+
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /* Models.BlackList.sync();
   let result = Models.BlackList.findAll({
     where: {
       UserAccountID: UserAccountID
     }
   }).then(function (result) {
     let Data = result.map(function (item) {
       return item;
     });
     if (Data.length > 0) {
       callback(Data);
     } else {
       callback(undefined);
     }
   }).catch(function (result) { //catching any then errors
     console.log("Error " + result);
     callback(undefined);
   });*/
}
/**
 *
 *
 * @param {*} BlackListID
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} callback
 */
module.exports.BlackListStatusUpdate = function BlackListStatusUpdate(BlackListID, UserAccountID, Status, callback) {
  let _BlackListID = BlackListID;
  let _UserAccountID =UserAccountID;
  let _Status= Status;
  let query = 
  "UPDATE `sampledb`.`blacklist` "+
  "SET Status = '"+_Status+"', ReleaseDate=now()"+
  "WHERE BlackListID = "+_BlackListID+" and UserAccountID='"+_UserAccountID+"';"

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
 * @param {*} UserAccountID
 * @param {*} Title
 * @param {*} Status
 * @param {*} Description
 * @param {*} ReportDate
 * @param {*} ReleaseDate
 * @param {*} callback
 */
module.exports.AddBlackList = function AddBlackList(UserAccountID, Title, Status, Description, ReportDate, ReleaseDate, callback) {
  let _UserAccountID = UserAccountID;
let _Title = Title;
let _Status = Status;
let _Description = Description;
let _ReportDate = ReportDate;
let _ReleaseDate = ReleaseDate;
  let query =
  "INSERT INTO `sampledb`.`blacklist` (`UserAccountID`, `Status`, `Title`, `Description`, `ReportDate`, `ReleaseDate`) "+
  "VALUES ('"+_UserAccountID+"','"+_Title+"','"+_Status+"','"+_Description+"','"+_ReportDate+"','"+_ReleaseDate+"');";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}