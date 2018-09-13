let DBConnect = require("../../SharedController/DBConnect");
module.exports.InGameTransferHistoryByUseraccountID = function InGameTransferHistoryByUseraccountID(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query ="call sampledb.TransfersHistoryByUserAccountID('"+_UserAccountID+"');";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }