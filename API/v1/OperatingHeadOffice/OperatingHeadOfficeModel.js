var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');

// front end use
module.exports.RegisterHeadOffice = function RegisterHeadOffice(UserAccountID,Name,PhoneNumber,UserName,Password,Commission,callback){
  let _UserAccountID = UserAccountID;
  let _Name = Name;
  let _PhoneNumber = PhoneNumber;
  let _UserName = UserName;
  let _Password = Password;
  let _Commission = Commission;
  
  function Q1(){
    let query = "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`, `OnlineStatus`, `Verified`, `Key`) "+
    " VALUES (\'"+_UserAccountID+"\', \'"+_UserName+"\', \'"+_Password+"\', now(), \'Offline\', \'true\', null);";
    return new Promise((resolve,reject) => {
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
        }
      });
    });
  }
  function Q2(){
    let query ="INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`, `TelephoneNumber`) "+
    "VALUES (\'"+_UserAccountID+"\', null, \'"+_PhoneNumber+"\', null);";
    return new Promise((resolve,reject) => {
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
        }
      });
    });
  }
  function Q3(){
    let query = "INSERT INTO `sampledb`.`OperatingHeadOffice` (`UserAccountID`,`Name`,`Commission`) VALUES (\'"+_UserAccountID+"\', \'"+_Name+"\', \'"+_Commission+"\');";
    return new Promise((resolve,reject) => {
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
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
// not front end use
module.exports.AddHeadOffice = function AddHeadOffice(UserAccountID, Name, Description, Commission,OperatingHeadOfficeID, callback) {
  let _UserAccountID = UserAccountID;
  let _Name = Name;
  let _Description = Description;
  let _Commission = Commission;
  let _OperatingHeadOfficeID = OperatingHeadOfficeID;
  let query =
    "INSERT INTO `sampledb`.`headoffices` (`UserAccountID`, `Name`, `Description`, `Commission`,`OperatingHeadOfficeID`) VALUES (\'"+_UserAccountID+"\', \'"+_Name+"\', \'"+_Description+"\',"+_Commission+",\'"+_OperatingHeadOfficeID+"\');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
module.exports.IDOperatingHeadOffice = function IDOperatingHeadOffice(UserAccountID, callback) {
  let _UserAccountID = UserAccountID;

  let query = "select UserAccountID,OperatingHeadOfficeID from sampledb.operatingheadoffice where UserAccountID='"+_UserAccountID+"';";
  console.log(query);
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log("Found :"+response[0].OperatingHeadOfficeID);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}