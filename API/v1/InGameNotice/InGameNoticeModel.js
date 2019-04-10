var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");



module.exports.InGameNotice = function InGameNotice(callback) {
    let query = 
    "SELECT * FROM sampledb.in_game_notice;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
  module.exports.InGameNotice2 = function InGameNotice2(Location,NotificationType,callback) {
    
    let query = 
    "SELECT * FROM sampledb.in_game_notice where Location=\'"+Location+"\' and NotificationType=\'"+NotificationType+"\'";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }