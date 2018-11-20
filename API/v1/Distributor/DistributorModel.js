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
 * @param {*} HeadOfficeID
 * @param {*} Name
 * @param {*} callback
 */
/*
module.exports.AddDistributor = function AddDistributor(UserAccountID, HeadOfficeID, Name, callback) {
  let query = "";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}*/
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} HeadOfficeID
 * @param {*} Name
 * @param {*} callback
 */
/*
module.exports.DistributorUpdate = function DistributorUpdate(UserAccountID, HeadOfficeID, Name, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @HeadOfficeID=${HeadOfficeID};` +
    `SET @Name=${Name};` +
    "UPDATE `sampledb`.`distributors` " +
    "SET  HeadOfficeID = @HeadOfficeID , Name=@Name" +
    "WHERE HeadOfficeID=@HeadOfficeID and UserAccountID = @UserAccountID;";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}*/
  module.exports.RegisterDistributor = function RegisterDistributor(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, HeadOfficeID, callback) {
    let _UserAccountID = UserAccountID;
    let _Name = Name;
    let _PhoneNumber = PhoneNumber;
    let _UserName = UserName;
    let _Password = Password;
    let _Commission = Commission;
    let _HeadOfficeID = HeadOfficeID;

    function Q1() {
      let query = "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`, `OnlineStatus`, `Verified`, `Key`) " +
        " VALUES (\'" + _UserAccountID + "\', \'" + _UserName + "\',\'" + _Password + "\', now(), \'Offline\', \'true\', null);";
      return new Promise(resolve => {
        DBConnect.DBConnect(query, function (response) {
          if (response != undefined) {
            console.log(response);
            resolve(response);
          } else {
            resolve(undefined);
          }
        });
      });
    }

    function Q2() {
      let query = "INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`, `TelephoneNumber`) " +
        "VALUES (\'" + _UserAccountID + "\', null, \'" + _PhoneNumber + "\', null);";
      return new Promise(resolve => {
        DBConnect.DBConnect(query, function (response) {
          if (response != undefined) {
            console.log(response);
            resolve(response);
          } else {
            resolve(undefined);
          }
        });
      });
    }

    function Q3() {
      let query = "INSERT INTO `sampledb`.`distributors` (`UserAccountID`,`Name`,`Commission`,`HeadOfficeID`) VALUES (\'" + _UserAccountID + "\', \'" + _Name + "\', " + _Commission + ",\'" + _HeadOfficeID + "\');";
      return new Promise(resolve => {
        DBConnect.DBConnect(query, function (response) {
          if (response != undefined) {
            console.log(response);
            resolve(response);
          } else {
            resolve(undefined);
          }
        });
      });
    }
    async function RunAsync() {
      console.log('calling');
      let finalresult = [{}];
      let result = await Q1();
      let result2 = await Q2();
      let result3 = await Q3();
      console.log('Done');
      callback('done');
    }
    RunAsync();
  }

  module.exports.IDOfHeadOffice = function IDOfHeadOffice(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
  
    let query = "select UserAccountID,HeadOfficeID from sampledb.headoffices where UserAccountID='"+_UserAccountID+"';";
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log("Found :"+response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }