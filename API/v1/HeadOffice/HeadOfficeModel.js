var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');

module.exports.RegisterHeadOffice = function RegisterHeadOffice(HeadOfficeID,Name,PhoneNumber,Password,Commission,callback){
  let _HeadOfficeID = HeadOfficeID;
  let _UserAccountID = UserAccountID;
  let _Name = Name;
  let _PhoneNumber = PhoneNumber;
  let _Password = Password;
  let _Commission = Commission;
  function Q1(){
    let query = "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`, `OnlineStatus`, `Verified`, `Key`) "+
    " VALUES ('Account14', 'U14', 'U14', '2018-09-06 18:03:55', 'Offline', 'false', '14');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
  function Q2(){
    let query ="INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`, `TelephoneNumber`) "+
    "VALUES ('Account14', 'Email', 'PhoneNumber', 'TelephoneNumber');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
  function Q3(){
    let query = "INSERT INTO `sampledb`.`headoffices` (`UserAccountID`, `Name`, `Description`, `CurrentPoints`) VALUES ('Account2', 'U2', 'xzv', '0');";
    return new Promise(resolve => {
      
    });
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
}
module.exports.AddHeadOffice = function AddHeadOffice(UserAccountID, Name, Description, Commission, callback) {// not front end use
  let _UserAccountID = UserAccountID;
  let _Name = Name;
  let _Description = Description;
  let _Commission = Commission;

  let query =
    "INSERT INTO `sampledb`.`headoffices` (`UserAccountID`, `Name`, `Description`, `Commission`) VALUES ('"+_UserAccountID+"', '"+_Name+"', '"+_Description+"',"+_Commission+");";
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
  let query ="";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}