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
 * @param {*} NotificationID
 * @param {*} NotificationType
 * @param {*} Title
 * @param {*} Description
 * @param {*} DateTime
 * @param {*} callback
 */
module.exports.NotificationUpdate = function NotificationUpdate(NotificationID, NotificationType, Title, Description, Status, callback) {
  let _Title = Title;
  let _Description = Description;
  let _Status = Status;

  let query =
  "UPDATE `sampledb`.`notifications` " +
  "SET Title = '"+_Title+"', `Description` = \'"+_Description+"\', `DateTime` = now(), `Status` = \'"+_Status+"\'" +
  "WHERE NotificationID = NotificationID";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

/**
 *
 *
 * @param {*} NotificationType
 * @param {*} Title
 * @param {*} Description
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
module.exports.AddNotification = function AddNotification(NotificationType, Title, Description, Status, callback) {
  let _NotificationType = NotificationType;
  let _Title = Title;
  let _Description = Description;
  let _Status = Status;
  let query =
    "INSERT INTO `sampledb`.`notifications` (`NotificationType`, `Title`, `Description`, `DateTime`, `Status`) "+
    "VALUES (\'"+_NotificationType+"\', \'"+_Title+"\', \'"+_Description+"\', now(),\'"+_Status+"\');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
module.exports.NotificationSearch = function NotificationSearch(Column, Value, callback) {
  let _Column = Column;
  let _Value = Value;
  let query = 
  "SELECT * FROM sampledb.notifications where "+_Column+" like \'%"+_Value+"%\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}