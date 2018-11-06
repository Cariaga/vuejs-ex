var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");



//newer version
module.exports.RegisterAccount2 = function RegisterAccount2(UserAccountID, AccessID, UserName, Password, ScreenName, ValidKey, Email, PhoneNumber, BankName, AccountNumber, SecurityCode, Valid, Expiration, AccountHolder, ShopID, callback) {
  let _UserAccountID = UserAccountID;
  let _ScreenName = ScreenName;
  let _ShopID = ShopID;//recomended by
  let _UserName = UserName;
  let _Password = Password;
  let _ValidKey = ValidKey;
  let _Email = Email;
  let _PhoneNumber = PhoneNumber;
  let _BankName = BankName;
  let _AccountNumber = AccountNumber;
  let _SecurityCode = SecurityCode;
  let _Valid = Valid;
  let _Expiration = Expiration;
  let _AccountHolder = AccountHolder;
  let UserAccountQuery =
    "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`,`Verified`,`Key`,`Recommended`) " +
    "VALUES (\'" + _UserAccountID + "\',\'" + _UserName + "\',\'" + _Password + "\',now(),\'true\',\'" + _ValidKey + "\',\'"+_ShopID+"\');";
  console.log(UserAccountQuery);
  let UserInfoQuery =
    "INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`) " +
    "VALUES (\'" + _UserAccountID + "\',\'" + _Email + "\',\'" + _PhoneNumber + "\');";
  console.log(UserInfoQuery);

  let PlayerQuery =
    "INSERT INTO `sampledb`.`players` (`UserAccountID`, `ShopID`, `ScreenName`, `Name`, `Surname`, `CurrentRoomName`, `CurrentPoints`) " +
    "VALUES (\'" + _UserAccountID + "\', \'" + _ShopID + "\', \'" + _ScreenName + "\', \'\', \'\', \'\', 0)";
  console.log(PlayerQuery);

  let BankInfosQuery =
    "INSERT INTO `sampledb`.`bankinformations` (`UserAccountID`, `BankName`, `AccountNumber`, `SecurityCode`, `Valid`, `Expiration`, `DateTime`,`AccountHolder`) " +
    "VALUES (\'" + _UserAccountID + "\',\'" + _BankName + "\',\'" + _AccountNumber + "\',\'" + _SecurityCode + "\',\'true\',\'" + _Expiration + "\',now(),\'" + _AccountHolder + "\'); ";
  console.log(BankInfosQuery);

  function Q1(){
    return new Promise(resolve => {
      DBConnect.DBConnect(UserAccountQuery, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          resolve(undefined);
        }
      });
    });
  }
  function Q2(){
    return new Promise(resolve => {
      DBConnect.DBConnect(UserInfoQuery, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          resolve(undefined);
        }
      });
    });
  }
  function Q3(){
    return new Promise(resolve => {
      DBConnect.DBConnect(BankInfosQuery, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          resolve(undefined);
        }
      });
    });
  }
  function Q4(){
    return new Promise(resolve => {
      DBConnect.DBConnect(PlayerQuery, function (response) {
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
    let result4 = await Q4();
    console.log('Done');
    callback('done');
  }
  RunAsync();
}


//
module.exports.RegisterAccount = function RegisterAccount(UserAccountID, AccessID, UserName, Password, ValidKey, Email, PhoneNumber, BankName, AccountNumber, SecurityCode, Valid, Expiration,Recommended, callback) {
  let _UserAccountID = UserAccountID;
  let _AccessID = AccessID;
  let _UserName = UserName;
  let _Password = Password;
  let _ValidKey = ValidKey;
  let _Email = Email;
  let _PhoneNumber = PhoneNumber;
  let _BankName = BankName;
  let _AccountNumber = AccountNumber;
  let _SecurityCode = SecurityCode;
  let _Valid = Valid;
  let _Expiration = Expiration;
  let _Recommended = Recommended;
  let query =
    "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`,`Verified`,`Key`,`Recommended`) " +
    "VALUES (\'" + _UserAccountID + "\',\'" + _UserName + "\',\'" + _Password + "\',now(),\'false\',\'" + _ValidKey + "\',\'"+_Recommended+"\');";
  console.log(query);

  let query2 =
    "INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`) " +
    "VALUES (\'" + _UserAccountID + "\',\'" + _Email + "\',\'" + _PhoneNumber + "\');";
  console.log(query2);
  let query3 =
    "INSERT INTO `sampledb`.`bankinformations` (`UserAccountID`, `BankName`, `AccountNumber`, `SecurityCode`, `Valid`, `Expiration`, `DateTime`) " +
    "VALUES (\'" + _UserAccountID + "\',\'" + _BankName + "\',\'" + _AccountNumber + "\',\'" + _SecurityCode + "\',\'false',\'" + _Expiration + "\',now()); ";
  console.log(query3);

  async.waterfall([Q1, Q2], function (err, response) {
    DBConnect.DBConnect(query3, function (response2) {
      if (response2 != undefined) {
        console.log(response2);
        callback(response2);
      } else {
        //callback(undefined);
      }
    });
  });

  function Q1(callback) {
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);

        callback(null, response);
      } else {
        // callback(undefined);
      }
    });
  }

  function Q2(error, callback) {

    DBConnect.DBConnect(query2, function (response) {
      if (response != undefined) {
        console.log(response);

        callback(error, response);
      } else {
        //callback(undefined);
      }
    });
  }
}