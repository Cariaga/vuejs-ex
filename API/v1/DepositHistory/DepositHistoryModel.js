var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');

let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Amount
 * @param {*} BankNameUsed
 * @param {*} SecurityCodeUsed
 * @param {*} Status
 * @param {*} callback
 */
module.exports.AddDepositHistoryRequest = function AddDepositHistory(UserAccountID, UserTransactionID, Amount, callback) {
  let _UserAccountID = UserAccountID;
  let _UserTransactionID = UserTransactionID;
  let _Amount = Amount;
  
  let query =
    "INSERT INTO `sampledb`.`transactions` (`UserAccountID`,`UserTransactionID`, `Amount`, `TransactionType`)" +
    "VALUES ('" + _UserAccountID + "','" + _UserTransactionID + "','" + _Amount + "',now(),'false');";

  let query2 =
    "INSERT INTO `sampledb`.`transactioninfo` (`UserTransactionID`, `RequestedDateTime`)" +
    "VALUES ('"+ _UserTransactionID + "',now());";

    
    function Q1(callback) {
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
    }
    
    function Q2(callback) {
      DBConnect.DBConnect(query2, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
    }
    
    Promise.all([Q1, Q2]).then(function(values) {
      console.log(values);
      console.log('deposit successful');
    });
    



}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Amount
 * @param {*} BankNameUsed
 * @param {*} SecurityCodeUsed
 * @param {*} Status
 * @param {*} RequestedDATE
 * @param {*} ApprovedDATE
 * @param {*} RejectedDATE
 * @param {*} ProcessingDATE
 * @param {*} RequestedTIME
 * @param {*} ApprovedTIME
 * @param {*} RejectedTIME
 * @param {*} ProcessingTIME
 * @param {*} callback
 */
module.exports.AddDepositHistory = function AddDepositHistory(UserAccountID, UserTransactionID, Amount, AccountHolder, callback) {
  let _UserAccountID = UserAccountID;
  let _UserTransactionID = UserTransactionID;
  let _Amount = Amount;
  let _AccountHolder = AccountHolder;
  let query = 'INSERT INTO `sampledb`.`transactions` (`UserAccountID`,`UserTransactionID`, `Amount`, `TransactionType`)'+
              "VALUES ('"+_UserAccountID+"','"+_UserTransactionID+"','"+_Amount+"','deposit');";

  let query2 = 'INSERT INTO `sampledb`.`transactioninfo` (`UserTransactionID`,`AccountHolder`, `RequestedDateTime`)'+
              "VALUES ('"+_UserTransactionID+"','"+_AccountHolder+"',now());";


  var promise = new Promise(function(resolve, reject) {
   DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        resolve();
      } else {
        reject();
      }
     })
  });

  var promise2 = new Promise(function(resolve, reject) {
    DBConnect.DBConnect(query2, function (response) {
       if (response != undefined) {
         resolve();
       } else {
         reject();
       }
      })
   });
  
  Promise.all([promise,promise2]).then(function() {
    console.log('deposit successful');
    callback(true);
    }, function(){ //if promise or promise2 fail
    console.log('something went wrong')
    callback(undefined);
  });

            
}

module.exports.DepositHistoryUpdateProcessing = function DepositHistoryUpdateProcessing(UserAccountID, DepositHistoryID, ProcessingDATE, ProcessingTIME, callback) {
  let query = '';
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
  /*Models.DepositHistory.update({
      ProcessingDATE: ProcessingDATE,
      ProcessingTIME: ProcessingTIME,
      Status: "Processing"
    }, {
      where: {
        DepositHistoryID: DepositHistoryID,
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


module.exports.DepositHistoryUpdateRejected = function DepositHistoryUpdateRejected(UserAccountID, DepositHistoryID, RequestedDATE, RejectedTIME, callback) {
  let query = '';
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
  /*Models.DepositHistory.update({
      ApprovedDATE: RequestedDATE,
      ApprovedTIME: RejectedTIME,
      Status: "Rejected"
    }, {
      where: {
        DepositHistoryID: DepositHistoryID,
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
 * @param {*} DepositHistoryID
 * @param {*} callback
 */
module.exports.DepositHistoryIDUserAccountID = function DepositHistoryIDUserAccountID(UserAccountID, DepositHistoryID, callback) {
  let query = '';
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
  /*Models.DepositHistory.sync();
  let result = Models.DepositHistory.findAll({
    where: {
      DepositHistoryID: DepositHistoryID,
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
module.exports.DepositHistoryUserAccountIDStatus = function DepositHistoryUserAccountIDStatus(UserAccountID, Status, callback) {
  let query = '';
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
//SELECT * FROM sampledb.deposit_list where UserAccountID like '%%';

