var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');


module.exports.getCommissionPercentages = function getCommissionPercentages(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query = "SELECT * FROM sampledb.player_to_oho where UserAccountID=\'"+_UserAccountID+"\';";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }