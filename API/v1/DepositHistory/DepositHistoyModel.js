//---DepositHistory ROUTING START 
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
function AddDepositHistory(UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,callback){
    var item1 = Models.DepositHistory.build({
      UserAccountID:UserAccountID,
      Amount:Amount, 
      BankNameUsed:BankNameUsed,
      SecurityCodeUsed:SecurityCodeUsed,
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
    Models.DepositHistory.sync({alter : true});
    item1.save()
    .then(Success => {
      console.log("----AddDepositHistory Start-----");
      console.log(Success);
     
      console.log("----AddDepositHistory End-----");
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " +error);
      callback(undefined);
    });
  }

  function DepositHistoryUpdateProcessing(UserAccountID,DepositHistoryID,ProcessingDATE,ProcessingTIME,callback){
    Models.DepositHistory.update({
      ProcessingDATE: ProcessingDATE,
      ProcessingTIME:ProcessingTIME,
      Status:"Processing"
    },{
      where: {DepositHistoryID:DepositHistoryID,UserAccountID: UserAccountID }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " +error);
      callback(undefined);
    }); 
  }
  
  
  function DepositHistoryUpdateRejected(UserAccountID,DepositHistoryID,RequestedDATE,RejectedTIME,callback){
    Models.DepositHistory.update({
      ApprovedDATE: RequestedDATE,
      ApprovedTIME:RejectedTIME,
      Status:"Rejected"
    },{
      where: {DepositHistoryID:DepositHistoryID,UserAccountID: UserAccountID }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " +error);
      callback(undefined);
    }); 
  }
  /**
 *
 *
 * @param {*} UserAccountID
 * @param {*} DepositHistoryID
 * @param {*} callback
 */
function DepositHistoryIDUserAccountID(UserAccountID,DepositHistoryID,callback){
    Models.DepositHistory.sync();
    let result = Models.DepositHistory.findAll({ 
      where: {
        DepositHistoryID:DepositHistoryID,
        UserAccountID:UserAccountID
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
  }