
let DBConnect = require("../SharedController/DBConnect");
const mysql = require('mysql2');
  /**
   *
   *
   * @param {*} Email
   * @param {*} callback
   */
  module.exports.UserInfoEmailExist = function UserInfoEmailExist(Email, callback) {
    let _Email = Email
    let query =
    "SELECT * FROM `sampledb`.`userinfos` " +
    "WHERE Email = '" + _Email+"' ";
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
  }

  module.exports.isPhoneNumberExist = function isPhoneNumberExist(PhoneNumber, callback) {
    let _PhoneNumber = PhoneNumber
    let query =
    "SELECT * FROM `sampledb`.`userinfos` " +
    "WHERE PhoneNumber = '" + _PhoneNumber+"' ";
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
  }

  module.exports.isUserAccountBlocked = function isUserAccountBlocked(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query =
    "SELECT * FROM `sampledb`.`useraccounts` " +
    "WHERE UserAccountID = '"+_UserAccountID+"' ";
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
  }

  module.exports.isUserAccountIDExist = function isUserAccountIDExist(UserAccountID, callback) {
    let _UserAccountID = UserAccountID
    let query = "SELECT * FROM sampledb.useraccounts WHERE useraccounts.UserAccountID ='" + _UserAccountID+"'";
    
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log('UserAccountID exist');
        callback(response);
      }else{
        callback(undefined);
        console.log('UserAccountID does not exist');
      }
    });
  }

  module.exports.isUserAccountVerifiedUserName = function isUserAccountVerifiedUserName(UserName, callback) {
    let _UserName = UserName;
    let query =
    "SELECT * FROM `sampledb`.`useraccounts` " +
    "WHERE UserName = '"+_UserName+"' ";
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
  }

  function isDistributorAlreadyExist(DistributorID, callback) {
    let query =
    `SET @DistributorID=${DistributorID};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }

  function isPlayerAlreadyExist(PlayersID, callback) {
    let query =
    `SET @PlayersID=${PlayersID};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }

  module.exports.isScreenNameExist = function isScreenNameExist(ScreenName, callback) {
    let _ScreenName = ScreenName;
    let query =
    "SELECT * FROM `sampledb`.`players` " +
    "WHERE ScreenName = '"+_ScreenName+"' ";
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
  }

  function ChildDistributorsFromHeadOfficeID(HeadOfficeID, callback) { // returns Distributor
    let query =
    `SET @HeadOfficeID=${HeadOfficeID};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }

  module.exports.isSupportTicketIDExist = function isSupportTicketIDExist(SupportTicketID, callback) {
    let _SupportTicketID = SupportTicketID;
    let query =
    "SELECT * FROM `sampledb`.`supporttickets` " +
    "WHERE SupportTicketID = '"+_SupportTicketID+"' ";
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
  }

  module.exports.IsRoomIDExist = function IsRoomIDExist(RoomID, callback) {
    let _RoomID = RoomID;
    let query =
    "SELECT * FROM sampledb.roomconfigurations "+
    "WHERE RoomID = '"+_RoomID+"'";
   
    DBConnect.DBConnect(query,function(response){
      if(response.length>0){
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }

  module.exports.TryMinusCurrentPoints = function TryMinusCurrentPoints(UserAccountID, MinusPoints, callback) {
    let _UserAccountID = UserAccountID;
    let _MinusPoints = MinusPoints;
    let query =
      "SELECT CurrentPoints - '" + _MinusPoints + "' AS 'NewPoints' FROM `sampledb`.`players` " +
      "WHERE UserAccountID = '" + _UserAccountID + "' ";

    DBConnect.DBConnect(query, function (response) {
      if (response[0].NewPoints > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

function IsNotificationIDExist(NotificationID, callback) {
  let query =
  `SET @NotificationID=${NotificationID};`+
  
 
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback([]);
    }
  });
}

module.exports.CheckUserAccountIDKey = function CheckUserAccountIDKey(UserAccountID, Key, callback) {
  let _UserAccountID = UserAccountID;
  let _Key = Key;
  let query =
    "SELECT * FROM `sampledb`.`useraccounts` " +
    "WHERE UserAccountID = '" + _UserAccountID + "' AND `Key` = '"+ _Key + "' ";

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}
