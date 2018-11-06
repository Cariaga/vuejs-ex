let DBConnect = require("../../SharedController/DBConnect");
module.exports.InGameTransferHistoryByUserAccountID = function InGameTransferHistoryByUserAccountID(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query ="call sampledb.TransfersHistoryByUserAccountID(\'"+_UserAccountID+"\');";
    console.log(query);
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined&& response[0][0]!=undefined) {// a stored procedure returns a 2d array instead the first array is the result while the second array is the procedure
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }