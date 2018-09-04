var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.SupportTicketUserAccountID = function SupportTicketUserAccountID(UserAccountID, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.SupportTicket.sync();
  let result = Models.SupportTicket.findAll({
    where: {
      UserAccountID: UserAccountID
    }
  }).then(function (result) {
    let Data = result.map(function (item) {
      return item;
    });
    if (Data.length > 0) {
      callback(Data);
    } else {
      callback(undefined);
    }
  }).catch(function (result) { //catching any then errors
    console.log("Error " + result);
    callback(undefined);
  });*/
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} callback
 */
module.exports.SupportTicketUserAccountIDByStatus = function SupportTicketUserAccountIDByStatus(UserAccountID, Status, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Status=${Status};` +

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.SupportTicket.sync();
  let result = Models.SupportTicket.findAll({
    where: {
      UserAccountID: UserAccountID,
      Status: Status
    }
  }).then(function (result) {
    let Data = result.map(function (item) {
      return item;
    });
    if (Data.length > 0) {
      callback(Data);
    } else {
      callback(undefined);
    }
  }).catch(function (result) { //catching any then errors
    console.log("Error " + result);
    callback(undefined);
  });*/
}
/**
 *
 *
 * @param {*} SupportTicketID
 * @param {*} UserAccountID
 * @param {*} Title
 * @param {*} Description
 * @param {*} Reason
 * @param {*} Time
 * @param {*} Date
 * @param {*} Status
 * @param {*} callback
 */
module.exports.SupportTicketUpdate = function SupportTicketUpdate(SupportTicketID, UserAccountID, Title, Description, Reason,Answer,DateTime, Status, callback) {
  let query =
    `SET @SupportTicketID=${SupportTicketID};` +
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Title=${Title};` +
    `SET @Description=${Description};` +
    `SET @Reason=${Reason};` +
    `SET @Answer=${Answer};` +
    `SET @DateTime=${DateTime};` 
    `SET @Status=${Status};` +
    "UPDATE `sampledb`.`supporttickets` "+
    "SET Title = @Title, Description = @Description,Reason = @Reason,Answer = @Answer, DateTime = @DateTime, Status = @Status "+
    "WHERE SupportTicketID = @SupportTicketID and UserAccountID = @UserAccountID;"
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.SupportTicket.update({
      Title: Title,
      Description: Description,
      Reason: Reason,
      Time: Time,
      Date: Date,
      Status: Status
    }, {
      where: {
        SupportTicketID: SupportTicketID,
        UserAccountID: UserAccountID
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
 * @param {*} Title
 * @param {*} Description
 * @param {*} Reason
 * @param {*} Time
 * @param {*} Date
 * @param {*} Status
 * @param {*} callback
 */
module.exports.AddSupportTicket = function AddSupportTicket(UserAccountID, Title, Description, Reason, Answer, Status, callback) {
  let _UserAccountID = UserAccountID;
  let _Title = Title;
  let _Description = Description;
  let _Reason = Reason;
  let _Answer = Answer;
  let _Status = Status;
  let query =
    "INSERT INTO `sampledb`.`supporttickets` (`UserAccountID`, `Title`, `Description`, `Reason`, `Answer`, `DateTime`, `Status`) "+
    "VALUES ('"+_UserAccountID+"','"+_Title+"','"+_Description+"','"+_Reason+"','"+_Answer+"', now(),'"+_Status+"',);";
    
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*var item1 = Models.SupportTicket.build({
    UserAccountID: UserAccountID,
    Title: Title,
    Description: Description,
    Reason: Reason,
    Time: Time,
    Date: Date,
    Status: Status
  });
  Models.SupportTicket.sync({
    alter: true
  }); //force to recreate if non production code
  item1.save()
    .then(Success => {

      console.log("----AddSupportTicket Start-----");
      console.log(Success);
      console.log("----AddSupportTicket End-----");
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });*/
}