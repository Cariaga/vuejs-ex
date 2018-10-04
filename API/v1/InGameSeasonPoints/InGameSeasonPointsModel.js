var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
//SELECT ScreenName FROM sampledb.players where UserAccountID='Account8';
module.exports.InGameSeasonPoints = function InGameSeasonPoints(SeasonID, callback) {
    let _SeasonID = SeasonID;
    let query ="SELECT UserAccountID,SeasonID,CurrentPoints FROM sampledb.playerfinalcard where SeasonID='"+_SeasonID+"';";
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