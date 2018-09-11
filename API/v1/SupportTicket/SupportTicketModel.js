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
module.exports.SupportTicketUpdate = function SupportTicketUpdate(SupportTicketID, Answer, Status, callback) {
  let _SupportTicketID = SupportTicketID;
  let _Answer = Answer;
  let _Status = Status;
  let query =
    "UPDATE `sampledb`.`supporttickets` "+
    "SET Answer = '"+_Answer+"', Status = '"+_Status+"' "+
    "WHERE SupportTicketID = '"+_SupportTicketID+"' ";

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
    "VALUES ('"+_UserAccountID+"','"+_Title+"','"+_Description+"','"+_Reason+"','"+_Answer+"', now(),'"+_Status+"');";

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

module.exports.RequestSupportTicket = function RequestSupportTicket(UserAccountID, Title, Description, Reason, callback) {
  let _UserAccountID = UserAccountID;
  let _Title = Title;
  let _Description = Description;
  let _Reason = Reason;
  let query =
    "INSERT INTO `sampledb`.`supporttickets` (`UserAccountID`, `Title`, `Description`, `Reason`, `DateTime` ) "+
    "VALUES ('"+_UserAccountID+"','"+_Title+"','"+_Description+"','"+_Reason+"', now()); ";

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
module.exports.WriteNoticeSearchUserAccountID = function WriteNoticeSearchUserAccountID(SupportTicketID, UserAccountID,callback) {
  let _SupportTicketID = SupportTicketID;
  let _UserAccountID = UserAccountID;
  let query =
    "SELECT * FROM sampledb.player_writesupport where SupportTicketID="+_SupportTicketID+" and UserAccountID='"+_UserAccountID+"';";

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}