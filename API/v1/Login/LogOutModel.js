let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');

module.exports.LogOutUserAccount = function(UserAccountID, OnlineStatus, callback){
    let _UserAccountID = UserAccountID;
<<<<<<< HEAD
    let _OnlineStatus = OnlineStatus;
    let query =
    
    "UPDATE `sampledb`.`useraccounts` " +
    "SET OnlineStatus = '"+_OnlineStatus+"' " +
    "WHERE UserAccountID = '"+_UserAccountID+"' ";

    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
=======
>>>>>>> 87e81be59a72fa148e99272cb39f28891b5691e5
}