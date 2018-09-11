var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserName
 * @param {*} Key
 * @param {*} callback
 */
module.exports.VerifyAccount = function VerifyAccount(UserName, Key, callback) { // Verification with ValidKey // Public only use // Via ValidKey
  let _UserName = UserName;
  let _Key = Key;
  let query ="UPDATE `sampledb`.`useraccounts` SET `Verified` = 'true' WHERE (`UserAccountID` = '"+_Key+"' and `Key`='"+_UserName+"' and `Verified`='false');";

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}