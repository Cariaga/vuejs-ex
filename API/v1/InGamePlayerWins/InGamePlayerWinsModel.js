var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
var async = require("async");
let DBConnect = require("../../SharedController/DBConnect");



module.exports.InGamePlayersWinLoseRake = function InGamePlayersWinLoseRake(UserAccountIDList, callback) {
  let _UserAccountIDList = UserAccountIDList;
  let query ="select * from player_winlose where UserAccountID IN("+_UserAccountIDList+"); ";
  DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}