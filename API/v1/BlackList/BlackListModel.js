var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");

//select
module.exports.BlackList = function BlackList(limit , offset, callback) {
  let _limit = limit;
  let _offset = offset;
  // select player_black_list where select only the latest black list id of the user (with limit and offset)
  let query =
  " select un.hoUserName HeadOfficeID, un.dUserName DistributorID, un.sUserName ShopID, pbl.UserName "
  +" UserAccountID, pbl.ScreenName, pbl.RegisteredDateTime, pbl.ReleaseDate, pbl.Reason, pbl.Status "
  +" FROM sampledb.player_black_list pbl left join player_to_oho_username un on pbl.UserAccountID = un.pUserAccountID"
  +" WHERE pbl.BlackListID IN ( SELECT MAX(BlackListID) FROM player_black_list GROUP BY UserAccountID) "
  +" limit "+_limit+" offset "+_offset;
    console.log(query)
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

module.exports.BlackList2 = function BlackList2(Limit, Offset, Order, Direction, callback) {
  let _Limit = Limit;
  let _Offset = Offset;
  let _Order = Order;
  let _Direction = Direction;
  // select player_black_list where select only the latest black list id of the user (with limit and offset)
  let query =
  " select un.hoUserName HeadOfficeID, un.dUserName DistributorID, un.sUserName ShopID, pbl.UserName "
  +" UserAccountID, pbl.ScreenName, pbl.RegisteredDateTime, pbl.ReleaseDate, pbl.Reason, pbl.Status "
  +" FROM sampledb.player_black_list pbl left join player_to_oho_username un on pbl.UserAccountID = un.pUserAccountID"
  +" WHERE pbl.BlackListID IN ( SELECT MAX(BlackListID) FROM player_black_list GROUP BY UserAccountID) "
  +" order by "+_Order+" "+_Direction
  +" limit "+_Limit+" offset "+_Offset;
    console.log(query)
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}


 //Released
module.exports.BlackListStatusUpdate = function BlackListStatusUpdate(UserAccountID, callback) {
  let _UserAccountID =UserAccountID;
  let query = 
  "UPDATE `sampledb`.`blacklist` "+
  " SET Status = 'Released', ReleaseDate=now()"+
  " WHERE UserAccountID=\'"+_UserAccountID+"\' AND ReleaseDate IS NULL;"

  DBConnect.DBConnect(query, function (response) {
    console.log(query)
    console.log(response)
    callback(response);
    if (response.affectedRows > 0) {
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
 * @param {*} Status
 * @param {*} Reason
 * @param {*} callback
 */


module.exports.AddBlackList = function AddBlackList(UserAccountID, Reason, callback) {
  let _UserAccountID = UserAccountID;
  let _Reason = Reason;
  let query =
  "INSERT INTO `sampledb`.`blacklist` (`UserAccountID`, `Status`, `Reason`, `ReportDate`) "+
  "VALUES (\'"+_UserAccountID+"\' ,\'Blocked\',  \'"+_Reason+"\',now());";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.BlacklistSearch = function BlacklistSearch(Column, Value, callback) {
  let _Column = Column;
  let _Value = Value;
  let query = 
  " select un.hoUserName HeadOfficeID, un.dUserName DistributorID, un.sUserName ShopID, pbl.UserName UserAccountID, pbl.ScreenName, pbl.RegisteredDateTime, pbl.ReleaseDate, pbl.Reason, pbl.Status FROM sampledb.player_black_list pbl left join player_to_oho_username un on pbl.UserAccountID = un.pUserAccountID WHERE pbl.BlackListID IN ( SELECT MAX(BlackListID) FROM player_black_list GROUP BY UserAccountID) "
  +" AND pbl."+_Column+" like \'%"+_Value+"%\';";

  console.log(query)
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}