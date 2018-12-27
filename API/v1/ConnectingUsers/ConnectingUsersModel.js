let DBConnect = require("../../SharedController/DBConnect");
var isNullOrEmpty = require('is-null-or-empty');
module.exports.ConnectingUsers = function ConnectingUsers(callback) {
    let query =
    "SELECT * FROM sampledb.connecting_user;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }