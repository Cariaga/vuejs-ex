let DBConnect = require("../../SharedController/DBConnect");

module.exports.UserAccountOnline = function UserAccountOnline(callback) {
  let query =
    "SELECT * FROM sampledb.useraccount_onlinecountlist;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
module.exports.UserAccountRecentRegistered = function UserAccountRecentRegistered(callback) {
    let query =
      "SELECT * FROM sampledb.useraccount_recent_registered;";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
}
module.exports.TotalRegisteredUsers = function TotalRegisteredUsers(callback) {
  let query =
    "SELECT * FROM sampledb.total_registered_users;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
module.exports.TotalWithdrawDepositProfit = function TotalWithdrawDepositProfit(callback) {
  let query =
    "SELECT * FROM sampledb.withdraw_deposit_porfit_total;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
module.exports.TransactionRecent = function TransactionRecent(callback) {
  let query =
    "SELECT * FROM sampledb.transactions_today;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}