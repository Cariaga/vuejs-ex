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
function AddWithdrawHistory(UserAccountID, Amount, BankNameUsed, Status, RequestedDATE, ApprovedDATE, RejectedDATE, ProcessingDATE, RequestedTIME, ApprovedTIME, RejectedTIME, ProcessingTIME, callback) {
  var item1 = Models.WithdrawHistory.build({
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
    });
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
function WithdrawHistoryUpdate(WithdrawHistoryID, UserAccountID, Amount, BankNameUsed, SecurityCodeUsed, Status, RequestedDATE, ApprovedDATE, RejectedDATE, ProcessingDATE, RequestedTIME, ApprovedTIME, RejectedTIME, ProcessingTIME, callback) {
  Models.WithdrawHistory.update({
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
    });
}

function WithdrawHistoryUpdateApproved(UserAccountID, WithdrawHistoryID, ApprovedDATE, ApprovedTIME, callback) {
  Models.WithdrawHistory.update({
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
    });
}

function WithdrawHistoryUpdateProcessing(UserAccountID, WithdrawHistoryID, ProcessingDATE, ProcessingTIME, callback) {
  Models.WithdrawHistory.update({
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
    });
}

function WithdrawHistoryUpdateRejected(UserAccountID, WithdrawHistoryID, RejectedDATE, RejectedTIME, callback) {
  Models.WithdrawHistory.update({
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
    });
}

function HandHistoryUserAccountID(UserAccountID, callback) {
  Models.HandHistory.sync();
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
  });
}

function AddUserInfo(UserAccountID, Email, PhoneNumber, TelephoneNumber, callback) {

  Models.UserInfo.sync( /*{force:true}*/ );
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
    });
}

function WithdrawHistoryUserAccountID(UserAccountID, callback) {
  Models.WithdrawHistory.sync();
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
  });
}