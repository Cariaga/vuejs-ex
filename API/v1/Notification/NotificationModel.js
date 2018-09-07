var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');
/**
 *
 *
 * @param {*} NotificationID
 * @param {*} NotificationType
 * @param {*} Title
 * @param {*} Description
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
module.exports.NotificationUpdate = function NotificationUpdate(NotificationID, NotificationType, Title, Description, DateTime, callback) {
  let query =
    `SET @NotificationID=${NotificationID};` +
    `SET @NotificationType=${NotificationType};` +
    `SET @Title=${Title};` +
    `SET @Description=${Description};` +
    `SET @DateTime=${DateTime};` +
    "UPDATE `sampledb`.`notifications` "+
    "SET NotificationType = @NotificationType, Title = @Title, Description = @Description, DateTime = @DateTime "+
    "WHERE NotificationID = @NotificationID;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /* Models.Notification.update({
     NotificationType: NotificationType,
     Title: Title,
     Description: Description,
     Time: Time,
     Date: Date
   },{
     where: {NotificationID: NotificationID }
   })
   .then(Success => {
     callback("Updated");
   })
   
   .catch(error => {
     console.log("Error Updating " +error);
     callback(undefined);
   }); */
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
    "VALUES ('"+_NotificationType+"', '"+_Title+"', '"+_Description+"', now(),'"+_Status+"');";
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
  "SELECT * FROM sampledb.notifications where "+_Column+" like '%"+_Value+"%';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}