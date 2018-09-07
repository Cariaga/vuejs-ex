
let DBConnect = require("../../SharedController/DBConnect");
module.exports.SupportTicketUserAccountID = function SupportTicketUserAccountID(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query ="SELECT * FROM sampledb.supporttickets as ST where ST.UserAccountID = '"+_UserAccountID+"' and ST.Status='Pending';";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }