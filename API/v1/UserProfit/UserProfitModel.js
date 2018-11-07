let DBConnect = require("../../SharedController/DBConnect");

module.exports.UserProfitSearch = function UserProfitSearch(UserAccountID, UserTransactionID, Amount, callback) {
    let _UserAccountID = UserAccountID;
    let _UserTransactionID = UserTransactionID;
    let _Amount = Amount;
    
    let query =
      "INSERT INTO `sampledb`.`transactions` (`UserAccountID`,`UserTransactionID`, `Amount`, `TransactionType`)" +
      "VALUES (\'" + _UserAccountID + "\',\'" + _UserTransactionID + "\',\'" + _Amount + "\',now(),\'false\');";
  
    let query2 =
      "INSERT INTO `sampledb`.`transactioninfo` (`UserTransactionID`, `RequestedDateTime`)" +
      "VALUES ('"+ _UserTransactionID + "',now());";
  
      
    
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
      
}