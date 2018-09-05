let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
let DBConnect = require("./");
module.exports.LogOutUserAccount = function (UserAccountID, OnlineStatus, callback) {
    let _UserAccountID = UserAccountID;
    let query =
        "UPDATE `sampledb`.`useraccounts` " +
        "SET OnlineStatus = 'Offline' " +
        "WHERE UserAccountID = '" + _UserAccountID + "' ";

    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
      });
}