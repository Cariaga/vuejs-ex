var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.InGameAdminAnswerSupport = function InGameAdminAnswerSupport(SupportTicketID,Answer,callback) {
    let query = "UPDATE `sampledb`.`supporttickets` SET `Answer` = '"+Answer+"', `Status` = 'done' , `AnswerDateTime`= now() WHERE (`SupportTicketID` = '"+SupportTicketID+"');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }