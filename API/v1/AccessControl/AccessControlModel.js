var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');

let DBConnect = require("../../SharedController/DBConnect");
/*module.exports.AddAccessControl = function AddAccessControl(AccessID, AccessName, AccessTags, callback) {
  let query =
    `SET @AccessID='${AccessID}';` +
    `SET @AccessName='${AccessName}';` +
    `SET @AccessTags='${AccessTags}';` +
    "INSERT INTO `sampledb`.`accesscontrol` (`AccessID`, `AccessName`, `AccessTags`)" +
    " VALUES (@AccessID, @AccessName, @AccessTags);";

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}*/


/*
module.exports.AccessControlUpdate = function AccessControlUpdate(AccessID, AccessName, AccessTags, callback) {
  let query =
    `SET @AccessID=${AccessID};` +
    `SET @AccessName=${AccessName};` +
    `SET @AccessTags=${AccessTags};` +
    "UPDATE `sampledb`.`accesscontrol`"+
    "SET AccessID = @AccessID, AccessName = @AccessName, AccessTags = @AccessTags "+
    "WHERE AccessControlID = @AccessControlID; ";

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/