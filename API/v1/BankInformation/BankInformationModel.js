var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} BankInformationID
 * @param {*} BankName
 * @param {*} SecurityCode
 * @param {*} Expiration
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
/*
module.exports.BankInformationUpdate = function BankInformationUpdate(UserAccountID, BankInformationID, BankName, SecurityCode, Expiration, DateTime, callback) {

  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @BankInformationID=${BankInformationID};` +
    `SET @BankName=${BankName};` +
    `SET @SecurityCode=${SecurityCode};` +
    `SET @Expiration=${Expiration};` +
    `SET @DateTime=${DateTime};` +
    "UPDATE `sampledb`.`bankinformations` "+
    "SET BankName = @BankName, "+
    "SecurityCode = @SecurityCode, Expiration = @Expiration, DateTime =@DateTime "+
    "WHERE BankInformationID = @BankInformationID and UserAccountID=@UserAccountID;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });*/
  /*Models.BankInformation.update({
      UserAccountID: UserAccountID,
      BankName: BankName,
      SecurityCode: SecurityCode,
      Expiration: Expiration,
      Time: Time,
      Date: Date
    }, {
      where: {
        BankInformationID: BankInformationID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " + error);
      callback(undefined);
    });

}*/
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} BankName
 * @param {*} SecurityCode
 * @param {*} Valid
 * @param {*} Expiration
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
/*
module.exports.BankInformationAdd = function BankInformationAdd(UserAccountID, BankName,AccountNumber, SecurityCode, Valid, Expiration, DateTime, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @BankName=${BankName};` +
    `SET @AccountNumber=${AccountNumber};` +
    `SET @SecurityCode=${SecurityCode};` +
    `SET @Valid=${Valid};` +
    `SET @Expiration=${Expiration};` +
    `SET @DateTime=${DateTime};` +
    "INSERT INTO `sampledb`.`bankinformations` (`UserAccountID`, `BankName`, `AccountNumber`, `SecurityCode`, `Valid`, `Expiration`, `DateTime`) "+
    "VALUES (@UserAccountID, @BankName, @AccountNumber, @SecurityCode, @Valid, @Expiration, @DateTime); ";

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*var item1 = Models.BankInformation.build({
    UserAccountID: UserAccountID,
    BankName: BankName,
    SecurityCode: SecurityCode,
    Valid: Valid,
    Expiration: Expiration,
    Time: Time,
    Date: Date
  });
  Models.BankInformation.sync({
    alter: true 
  }); //force recreates deletes old table
  item1.save().then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });

}*/