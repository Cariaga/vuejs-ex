var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Amount
 * @param {*} BankNameUsed
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
module.exports =function AddWithdrawHistory(UserAccountID, Amount, BankNameUsed, Status, RequestedDATE, ApprovedDATE, RejectedDATE, ProcessingDATE, RequestedTIME, ApprovedTIME, RejectedTIME, ProcessingTIME, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*var item1 = Models.WithdrawHistory.build({
    UserAccountID: UserAccountID,
    Amount: Amount,
    BankNameUsed: BankNameUsed,
    Status: Status,
    RequestedDATE: RequestedDATE,
    ApprovedDATE: ApprovedDATE,
    RejectedDATE: RejectedDATE,
    ProcessingDATE: ProcessingDATE,
    RequestedTIME: RequestedTIME,
    ApprovedTIME: ApprovedTIME,
    RejectedTIME: RejectedTIME,
    ProcessingTIME: ProcessingTIME,
  });
  Models.WithdrawHistory.sync();
  item1.save()
    .then(Success => {
      callback("Inserted");
    })

    .catch(error => {

      console.log("error inserting " + error);
      callback(undefined);
    });*/
}
/**
 *
 *
 * @param {*} WithdrawHistoryID
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
module.exports = function WithdrawHistoryUpdate(WithdrawHistoryID, UserAccountID, Amount, BankNameUsed, SecurityCodeUsed, Status, RequestedDATE, ApprovedDATE, RejectedDATE, ProcessingDATE, RequestedTIME, ApprovedTIME, RejectedTIME, ProcessingTIME, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.WithdrawHistory.update({
      Amount: Amount,
      BankNameUsed: BankNameUsed,
      SecurityCodeUsed: SecurityCodeUsed,
      Status: Status,
      RequestedDATE: RequestedDATE,
      ApprovedDATE: ApprovedDATE,
      RejectedDATE: RejectedDATE,
      ProcessingDATE: ProcessingDATE,
      RequestedTIME: RequestedTIME,
      ApprovedTIME: ApprovedTIME,
      RejectedTIME: RejectedTIME,
      ProcessingTIME: ProcessingTIME
    }, {
      where: {
        WithdrawHistoryID: WithdrawHistoryID,
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

module.exports = function WithdrawHistoryUpdateApproved(UserAccountID, WithdrawHistoryID, ApprovedDATE, ApprovedTIME, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.WithdrawHistory.update({
      ApprovedDATE: ApprovedDATE,
      ApprovedTIME: ApprovedTIME,
      Status: "Approved"
    }, {
      where: {
        WithdrawHistoryID: WithdrawHistoryID,
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

module.exports = function WithdrawHistoryUpdateProcessing(UserAccountID, WithdrawHistoryID, ProcessingDATE, ProcessingTIME, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.WithdrawHistory.update({
      ProcessingDATE: ProcessingDATE,
      ProcessingTIME: ProcessingTIME,
      Status: "Processing"
    }, {
      where: {
        UserAccountID: UserAccountID,
        WithdrawHistoryID: WithdrawHistoryID
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

module.exports = function WithdrawHistoryUpdateRejected(UserAccountID, WithdrawHistoryID, RejectedDATE, RejectedTIME, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.WithdrawHistory.update({
      RejectedDATE: RejectedDATE,
      RejectedTIME: RejectedTIME,
      Status: "Rejected"
    }, {
      where: {
        UserAccountID: UserAccountID,
        WithdrawHistoryID: WithdrawHistoryID
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

module.exports = function HandHistoryUserAccountID(UserAccountID, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.HandHistory.sync();
  let result = Models.HandHistory.findAll({
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

module.exports = function AddUserInfo(UserAccountID, Email, PhoneNumber, TelephoneNumber, callback) {

  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.UserInfo.sync(  );
  var item1 = Models.UserInfo.build({
    UserAccountID: UserAccountID,
    Email: Email,
    PhoneNumber: PhoneNumber,
    TelephoneNumber: TelephoneNumber
  });
  Models.UserInfo.sync(); //only use force true if you want to destroy replace table
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {

      console.log("error inserting " + error);
      callback(undefined);
    });*/
}

module.exports = function WithdrawHistoryUserAccountID(UserAccountID, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.WithdrawHistory.sync();
  let result = Models.WithdrawHistory.findAll({
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