var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
var async = require("async");
let DBConnect = require("../../SharedController/DBConnect");
module.exports.InGamePlayerWins = function InGamePlayerWins(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query ="SELECT Count(WinPoints) as WinPoints FROM sampledb.playerfinalcard WHERE winpoints > 0 AND UserAccountID = '"+_UserAccountID+"'; ";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
}