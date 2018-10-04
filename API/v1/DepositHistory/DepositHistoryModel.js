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
  module.exports.DepositHistoryUserTransactionID = function DepositHistoryUserTransactionID(UserTransactionID,callback){
    let _UserTransactionID = UserTransactionID;
    let query = "SELECT UserAccountID,UserTransactionID,Amount FROM sampledb.transactions WHERE UserTransactionID ='"+_UserTransactionID+"'";
    var promise = new Promise(function(resolve, reject) {
      DBConnect.DBConnect(query, function (response) {
         if (response != undefined) {
           resolve(response);
         } else {
           reject();
         }
        })
     });
     Promise.all([promise]).then(function(response) {
      callback(response);
      }, function(){ //if promise fail
      console.log('something went wrong')
      callback(undefined);
    });
  }

  module.exports.ComputedNewMoney = function ComputedNewMoney(UserTransactionID, callback) {
    let _UserTransactionID = UserTransactionID;
    let query ="select (SELECT UserAccountID FROM sampledb.transactions where UserTransactionID= '"+_UserTransactionID+"') as UserAccountID,(SELECT Amount FROM sampledb.transactions where UserTransactionID= '"+_UserTransactionID+"')+(SELECT Money FROM sampledb.players where UserAccountID = (SELECT UserAccountID FROM sampledb.transactions where UserTransactionID= '"+_UserTransactionID+"')) as Amount from sampledb.transactions where UserTransactionID='"+_UserTransactionID+"' and TransactionStatus='pending';";
    console.log('computed new money : '+query)
    var promise = new Promise(function(resolve, reject) {
     DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          resolve(response[0]);
        } else {
          reject();
        }
       })
    });
    Promise.all([promise]).then(function(response) {
      callback(response);
      }, function(){ 
        
      callback(undefined);
    });        
  }

  module.exports.UpdatePlayerMoney = function UpdatePlayerMoney(UserAccountID,NewMoney, callback) {
    let _NewMoney = NewMoney;
    let _UserAccountID = UserAccountID;
    let query ="UPDATE `sampledb`.`players` SET `Money` = '"+_NewMoney+"' WHERE (`UserAccountID` = '"+_UserAccountID+"');";
    console.log(query)
    var promise = new Promise(function(resolve, reject) {
     DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          resolve(response);
        } else {
          reject();
        }
       })
    });
    Promise.all([promise]).then(function(response) {
      callback(response);
      }, function(){ //if promise or promise2 fail
      console.log('something went wrong')
      callback(undefined);
    });        
  }


  module.exports.DepositHistoryUpdateApproved = function DepositHistoryUpdateApproved(UserTransactionID, UserAccountID, callback) {
    let _UserTransactionID = UserTransactionID;
    let _UserAccountID = UserAccountID;
    let Amount;
    let query = "SELECT UserTransactionID,Amount+(select Money from players as P where  P.UserAccountID = '"+_UserAccountID+"') as Money"+
                " FROM sampledb.transactions where TransactionType ='deposit' and TransactionStatus='pending' and UserTransactionID= '"+_UserTransactionID+"' and UserAccountID= '"+_UserAccountID+"' ;";
  
    let query2 = 'UPDATE `sampledb`.`players` as P SET P.Money = '+Amount+
                " WHERE P.UserAccountID = '"+_UserAccountID+"' ;";

    let query3 = "UPDATE `sampledb`.`transactions` SET `TransactionStatus` = 'approved'"
                " WHERE (`UserTransactionID` = '"+_UserTransactionID+"' and TransactionType = 'deposit');";

    let query4 = "UPDATE `sampledb`.`transactioninfo` SET ApprovedDateTime = now()"+
                " WHERE (`UserTransactionID` = '"+_UserTransactionID+"');";
    
    amountSetter = function(value){
      Amount = value
      console.log('amountsetter : '+value)
    }


    var promise = new Promise(function(resolve, reject) {
     DBConnect.DBConnect(query, function (response) {
       console.log('promise 1 response: '+response)
        if (response != undefined) {

          resolve(response);
        } else {
          reject();
        }
       })
    })
    .then(function(value){ 
      amountSetter(value[0]['Money'])
      console.log('promise 1 result = '+value[0]['Money'])
      Promise.all([promise2,promise3,promise4]).then(function(values) {
        console.log('promise all return: '+values)
        console.log('approved deposit successful');
        callback(true);
        }, function(error){ //if promise or promise2 fail
        console.log('something went wrong')
        console.log('promise all error : ' + error)
        callback(undefined);
      });     
    })
    .catch(function(error){
      console.log('promise 1 error : '+error)
    });
  
    var promise2 = new Promise(function(resolve, reject) {
      console.log('this is amount : '+Amount)
      DBConnect.DBConnect(query2, function (response) {
        console.log('promise 2 response: '+response)
          if (response != undefined) {
            resolve();
          } else {
            reject();
          }
        })
     })

     promise2.catch(function(error){
       console.log('promise 2 error : '+error)
     });

    var promise3 = new Promise(function(resolve, reject) {
      DBConnect.DBConnect(query3, function (response) {
        console.log('promise 3 response: '+response)
         if (response != undefined) {
           resolve();
         } else {
           reject();
           console.log('promise 3 fails');
         }
        })
     })
     promise3.catch(function(error){
      console.log('promise 3 error : '+error)
     });

    var promise4 = new Promise(function(resolve, reject) {
      DBConnect.DBConnect(query4, function (response) {
        console.log('promise 4 response: '+response)
         if (response != undefined) {
           resolve();
         } else {
           reject();

           console.log('promise 4 fails');
         }
        })
     })
     promise4.catch(function(error){
      console.log('promise 4 error : '+error)
     });
       
  }



  
// DepositHistoryUpdateArchived
module.exports.DepositHistoryUpdateArchived = function DepositHistoryUpdateArchived(UserTransactionID, callback) {
  let _UserTransactionID = UserTransactionID;
  let query = 'UPDATE `sampledb`.`transactions` SET `TransactionStatus` = \'archived\' '+
              " WHERE (UserTransactionID = '"+_UserTransactionID+"' AND TransactionType = 'deposit');";

  let query2 = 'UPDATE `sampledb`.`transactioninfo` SET ApprovedDateTime = now()'+
              " WHERE (UserTransactionID = '"+_UserTransactionID+"');";

  console.log(query)
  console.log(query2)
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
    console.log('approved deposit successful');
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

module.exports.TransactionStatus = function TransactionStatus(UserTransactionID, callback) {
  let _UserTransactionID = UserTransactionID;
  let query = "SELECT TransactionStatus FROM sampledb.transactions where UserTransactionID='"+_UserTransactionID+"';";
  console.log(query);
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.isTransactionExist = function isTransactionExist(UserTransactionID, callback) {
  let _UserTransactionID = UserTransactionID;
  let query = "SELECT * FROM sampledb.transactions where UserTransactionID='"+_UserTransactionID+"' and TransactionType='deposit';";
  console.log(query);
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
//SELECT * FROM sampledb.deposit_list where UserAccountID like '%%';

