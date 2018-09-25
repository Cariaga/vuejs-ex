let DBConnect = require("../../SharedController/DBConnect");
module.exports.InGameTransferHistoryByUserAccountID = function InGameTransferHistoryByUserAccountID(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query ="";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }