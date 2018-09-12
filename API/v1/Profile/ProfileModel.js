var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.Profile = function Profile(UserAccountID, callback) {
    let query ="";
    DBConnect.DBConnect(query, function (response2) {
        if (response2 != undefined) {
          console.log(response2);
          callback(response2);
        } else {
          //callback(undefined);
        }
      });
}