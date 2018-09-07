

module.exports.SupportTicketUserAccountID = function SupportTicketUserAccountID(UserAccountID, callback) {
    let query =
      `SET @UserAccountID=${UserAccountID};` +
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }