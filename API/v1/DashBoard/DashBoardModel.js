let DBConnect = require("../../SharedController/DBConnect");

module.exports.HeadOfficeBettingDaily = function HeadOfficeBettingDaily(callback) {
  let query =
    "SELECT * FROM sampledb.headoffice_daily_betting;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

module.exports.HeadOfficeBettingMonthly = function HeadOfficeBettingMonthly(callback) {
  let query =
    "SELECT * FROM sampledb.headoffice_monthly_betting;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

module.exports.HeadOfficeBettingYearly = function HeadOfficeBettingYearly(callback) {
  let query =
    "SELECT * FROM sampledb.headoffice_yearly_betting;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

module.exports.HeadOfficeWithdrawDaily = function HeadOfficeWithdrawDaily(callback) {
  let query =
    "SELECT distinct UserName OfficeID, (select sum(round(Amount)) from headoffice_daily_withdraw hdw2 where hdw2.UserName = OfficeID ) Amount FROM sampledb.headoffice_daily_withdraw;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

module.exports.HeadOfficeDepositDaily = function HeadOfficeDepositDaily(callback) {
  let query =
    "SELECT distinct UserName OfficeID,  (select sum(round(Amount)) from headoffice_daily_deposit hdd2 where hdd2.UserName = OfficeID ) Amount FROM sampledb.headoffice_daily_deposit;";
    // "SELECT * FROM sampledb.headoffice_daily_deposit;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        // console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}

module.exports.UserAccountOnline = function UserAccountOnline(callback) {
  let query =
    "SELECT * FROM sampledb.useraccount_onlinecountlist;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        // console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
/*module.exports.UserAccountRecentRegistered = function UserAccountRecentRegistered(callback) {
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
}*/
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

module.exports.TotalRegisteredUsersToday = function TotalRegisteredUsers(callback) {
  let query =
    "SELECT * FROM sampledb.total_recent_registered;";
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
module.exports.TotalTransactionRecent = function TotalTransactionRecent(callback) {
  let query =
    "SELECT * FROM sampledb.total_transactions_today;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
    
}