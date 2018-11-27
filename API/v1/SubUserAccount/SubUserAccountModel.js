var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.AddSubAccount = function AddSubAccount(UserName,Password,AccessID, MainUserAccountID, callback) {
    let _UserAccountID = uuidv4();
    let _AccessID = AccessID;
    let _MainUserAccountID = MainUserAccountID;
    let _UserName=UserName;
    let _Password=Password;
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
        let query = "INSERT INTO `sampledb`.`subaccounts` (`UserAccountID`, `AccessID`, `MainUserAccountID`) VALUES (\'"+_UserAccountID+"\', \'"+_AccessID+"\', `\'"+_MainUserAccountID+"\');";
        return new Promise((resolve,reject)  => {
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
        console.log('Done');
        callback('done');
      }
      RunAsync();
}