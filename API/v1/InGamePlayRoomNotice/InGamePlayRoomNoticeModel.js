var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");



module.exports.InGamePlayRoomNotice = function InGamePlayRoomNotice(RoomID,callback) {
    let _RoomID=RoomID;
    let query = 
    "SELECT RoomNotice FROM sampledb.roomconfigurations where RoomID='"+_RoomID+"';";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }