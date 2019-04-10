let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');

module.exports.OneOnOne = function OneOnOne(Limit,Offset,Order,Direction,callback) {
  let _Limit = Limit;
  let _Offset = Offset;
  let _Order = Order;
  let _Direction = Direction;
  let query = "SELECT * FROM sampledb.player_supportlist order by "+_Order+" "+_Direction+" Limit "+_Limit+ " Offset "+_Offset; 
  DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
          console.log(response);
          callback(response);
      } else {
          callback(undefined);
      }
  });
}
module.exports.SupportSearchSupportTicketUserAccountID = function SupportSearchSupportTicketUserAccountID(SupportTicketID, UserAccountID,callback) {
    let _SupportTicketID = SupportTicketID;
    let _UserAccountID = UserAccountID;
    let query =
      "SELECT * FROM sampledb.player_writesupport where SupportTicketID="+_SupportTicketID+" and UserAccountID=\'"+_UserAccountID+"\';";
  
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }

module.exports.WriteSupportTicketID = function WriteSupportTicketID(UserAccountID,SupportTicketID,callback){
    let _SupportTicketID = SupportTicketID;
    let _UserAccountID = UserAccountID;
    let query = "SELECT * FROM sampledb.player_writesupport where SupportTicketID="+_SupportTicketID+" and UserAccountID=\'"+_UserAccountID+"\';";
  console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}
module.exports.WriteSupportAnswerUpdate = function WriteSupportAnswerUpdate(SupportTicketID, UserAccountID, Answer,callback){
    let _SupportTicketID = SupportTicketID;
    let _UserAccountID = UserAccountID;
    let _Answer = Answer;
    let query = 
    "UPDATE `sampledb`.`supporttickets` " +
    "SET Answer = \'"+_Answer+"\', `AnswerDateTime` = now(),`Status` = 'Done' " +
    " WHERE SupportTicketID = "+
    _SupportTicketID +
    " AND UserAccountID = "+
    "\'"+_UserAccountID+"\'" ;
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}


//SELECT * FROM sampledb.player_supportlist where PlayerUserAccountID like '%%';
module.exports.SupportSearch = function SupportSearch(Column, Value, callback) {
    let _Column = Column;
    let _Value = Value;
    let query = 
    "SELECT * FROM sampledb.player_supportlist where player_supportlist."+_Column+" like '%"+_Value+"%';";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined && response.length>0) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
