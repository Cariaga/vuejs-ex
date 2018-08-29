function TransferHistoryAll(callback){
    Models.TransferHistory.sync();
    let result = Models.TransferHistory.findAll({ 
      where: {
        TransferHistoryID: {
          ne: null//not null
        }
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
  function TransferHistoryUserAccountIDReceiver(UserAccountIDReceiver,callback){
    Models.TransferHistory.sync();
      let result = Models.TransferHistory.findAll({ 
        where: {
          UserAccountIDReceiver:UserAccountIDReceiver
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
  
  function TransferHistoryUserAccountIDSender(UserAccountIDSender,callback){
    Models.TransferHistory.sync();
      let result = Models.TransferHistory.findAll({ 
        where: {
          UserAccountIDSender:UserAccountIDSender
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
  function TransferHistoryTransferHistoryUUID(TransferHistoryUUID,callback){
    Models.TransferHistory.sync();
    let result = Models.TransferHistory.findAll({ 
      where: {
        TransferHistoryUUID:TransferHistoryUUID
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
  function TransferHistoryUpdate(TransferHistoryUUID,UserAccountIDReceiver,UserAccountIDSender,Amount,Status,Reason,TransferedDATE,callback){
    Models.TransferHistory.update({
      UserAccountIDReceiver:UserAccountIDReceiver,
      UserAccountIDSender:UserAccountIDSender,
      Amount:Amount,
      Status:Status,
      Reason:Reason,
      TransferedDATE:TransferedDATE,
    },{
      where: {TransferHistoryUUID: TransferHistoryUUID}
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " +error);
      callback(undefined);
    });
  }