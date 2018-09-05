var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.UpdateTransactionStatus = function (UserTransactionID, TransactionStatus, callback) {
    let _UserTransactionID = UserTransactionID;
    let _TransactionStatus = TransactionStatus;
    let query =
        "UPDATE `sampledb`.`transactions` " +
        "SET TransactionStatus = '"+_TransactionStatus+"' " +
        "WHERE UserAccountID = '" + _UserTransactionID + "' ";

    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
      });
}