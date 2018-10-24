var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");



module.exports.RegisterShop = function RegisterShop(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, DistributorID, callback) {
  let _UserAccountID = UserAccountID;
  let _Name = Name;
  let _PhoneNumber = PhoneNumber;
  let _UserName = UserName;
  let _Password = Password;
  let _Commission = Commission;
  let _DistributorID = DistributorID;

  function Q1() {
    let query = "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`, `OnlineStatus`, `Verified`, `Key`) " +
      " VALUES ('" + _UserAccountID + "', '" + _UserName + "', '" + _Password + "', now(), 'Offline', 'true', null);";
      console.log(query);
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
      "VALUES ('" + _UserAccountID + "', null, '" + _PhoneNumber + "', null);";
      console.log(query);
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
    let query = "INSERT INTO `sampledb`.`shops` (`UserAccountID`,`Name`,`Commission`,`DistributorID`) VALUES ('" + _UserAccountID + "', '" + _Name + "', " + _Commission + ",'" + _DistributorID + "');";
    console.log(query);
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
