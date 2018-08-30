var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
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
module.exports.BankInformationUpdate = function BankInformationUpdate(UserAccountID, BankInformationID, BankName, SecurityCode, Expiration, Time, Date, callback) {
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
    });*/
    
}
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
module.exports.BankInformationAdd = function BankInformationAdd(UserAccountID, BankName, SecurityCode, Valid, Expiration, Time, Date, callback) {
  var item1 = Models.BankInformation.build({
    UserAccountID: UserAccountID,
    BankName: BankName,
    SecurityCode: SecurityCode,
    Valid: Valid,
    Expiration: Expiration,
    Time: Time,
    Date: Date
  });
  Models.BankInformation.sync({
    alter: true /*,force:true*/
  }); //force recreates deletes old table
  item1.save().then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });
}
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
module.exports.BankInformationAdd = function BankInformationAdd(UserAccountID, BankName, SecurityCode, Valid, Expiration, Time, Date, callback) {
  var item1 = Models.BankInformation.build({
    UserAccountID: UserAccountID,
    BankName: BankName,
    SecurityCode: SecurityCode,
    Valid: Valid,
    Expiration: Expiration,
    Time: Time,
    Date: Date
  });
  Models.BankInformation.sync({
    alter: true /*,force:true*/
  }); //force recreates deletes old table
  item1.save().then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });
}