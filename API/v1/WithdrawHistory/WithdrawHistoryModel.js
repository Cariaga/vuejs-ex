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
function AddWithdrawHistory(UserAccountID,Amount,BankNameUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,callback){
    var item1 = Models.WithdrawHistory.build({
      UserAccountID:UserAccountID,
      Amount:Amount, 
      BankNameUsed:BankNameUsed, 
      Status:Status,
      RequestedDATE:RequestedDATE,
      ApprovedDATE:ApprovedDATE,
      RejectedDATE:RejectedDATE,
      ProcessingDATE:ProcessingDATE, 
      RequestedTIME:RequestedTIME,
      ApprovedTIME:ApprovedTIME,
      RejectedTIME:RejectedTIME,
      ProcessingTIME:ProcessingTIME, 
      });
      Models.WithdrawHistory.sync();
      item1.save()
      .then(Success => {
        callback("Inserted");
      })
      
      .catch(error => {
    
        console.log("error inserting " +error);
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
function WithdrawHistoryUpdate(WithdrawHistoryID,UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,callback){
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
      ApprovedTIME:ApprovedTIME,
      RejectedTIME: RejectedTIME,
      ProcessingTIME: ProcessingTIME
    },{
      where: {WithdrawHistoryID: WithdrawHistoryID,UserAccountID:UserAccountID }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " +error);
      callback(undefined);
    });
  }
  function WithdrawHistoryUpdateApproved(UserAccountID,WithdrawHistoryID,ApprovedDATE,ApprovedTIME,callback){
    Models.WithdrawHistory.update({
      ApprovedDATE: ApprovedDATE,
      ApprovedTIME:ApprovedTIME,
      Status:"Approved"
    },{
      where: {WithdrawHistoryID:WithdrawHistoryID,UserAccountID: UserAccountID }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " +error);
      callback(undefined);
    }); 
  }
  
  function WithdrawHistoryUpdateProcessing(UserAccountID,WithdrawHistoryID,ProcessingDATE,ProcessingTIME,callback){
    Models.WithdrawHistory.update({
      ProcessingDATE: ProcessingDATE,
      ProcessingTIME:ProcessingTIME,
      Status:"Processing"
    },{
      where: {UserAccountID: UserAccountID,WithdrawHistoryID:WithdrawHistoryID }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " +error);
      callback(undefined);
    });
  }
  
  function WithdrawHistoryUpdateRejected(UserAccountID,WithdrawHistoryID,RejectedDATE,RejectedTIME,callback){
    Models.WithdrawHistory.update({
      RejectedDATE: RejectedDATE,
      RejectedTIME:RejectedTIME,
      Status:"Rejected"
    },{
      where: {UserAccountID: UserAccountID,WithdrawHistoryID:WithdrawHistoryID }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " +error);
      callback(undefined);
    });
  }