var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports = function SupportTicketUserAccountID(UserAccountID, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
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
module.exports = function SupportTicketUserAccountIDByStatus(UserAccountID, Status, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
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
function SupportTicketUpdate(SupportTicketID, UserAccountID, Title, Description, Reason, Time, Date, Status, callback) {
  Models.SupportTicket.update({
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
function AddSupportTicket(UserAccountID, Title, Description, Reason, Time, Date, Status, callback) {
  var item1 = Models.SupportTicket.build({
    UserAccountID: UserAccountID,
    Title: Title,
    Description: Description,
    Reason: Reason,
    Time: Time,
    Date: Date,
    Status: Status
  });
  Models.SupportTicket.sync({
    alter: true /*,force:true*/
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
    });
}