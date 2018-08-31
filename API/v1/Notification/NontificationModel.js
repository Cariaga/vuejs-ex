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
module.exports.AddNotification = function AddNotification(NotificationType, Title, Description, DateTime, callback) {
  let query =
    `SET @NotificationType=${NotificationType};` +
    `SET @Title=${Title};` +
    `SET @Description=${Description};` +
    `SET @DateTime=${DateTime};` +
    "INSERT INTO `sampledb`.`notifications` (`NotificationType`, `Title`, `Description`, `DateTime`) "+
    "VALUES (@NotificationType, @Title, @Description, @DateTime);";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*var item1 = Models.Notification.build({
    NotificationType:NotificationType,
    Title:Title,
    Description:Description,
    Time:Time,
    Date:Date
  });
  Models.Notification.sync({alter : true});//force only for non production it recreates the table
  item1.save()
  .then(Success => {
    console.log("----AddNotification Start-----");
    console.log(Success);
    console.log("----AddNotification End-----");
    callback("Inserted");
  })
  
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });*/
}