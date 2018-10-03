var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
//SELECT ScreenName FROM sampledb.players where UserAccountID='Account8';
module.exports.InGameScreeName = function InGameScreeName(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query ="SELECT ScreenName FROM sampledb.players where UserAccountID='"+_UserAccountID+"';";
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
      //console.log(response);
        if (response != undefined) {
        
          callback(response);
        } else {
          callback(undefined);
        }
      });
}