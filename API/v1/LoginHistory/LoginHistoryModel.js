var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} LoginHistoryID
 * @param {*} UserAccountID
 * @param {*} IP
 * @param {*} DeviceName
 * @param {*} DeviceRam
 * @param {*} DeviceCpu
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
module.exports = function LoginHistoryUpdate(LoginHistoryID, UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, Time, Date, callback) {
  Models.LoginHistory.update({
      IP: IP,
      DeviceName: DeviceName,
      DeviceRam: DeviceRam,
      DeviceCpu: DeviceCpu,
      Time: Time,
      Date: Date
    }, {
      where: {
        LoginHistoryID: LoginHistoryID,
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {

      console.log("Error Updating " + error);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} IP
 * @param {*} DeviceName
 * @param {*} DeviceRam
 * @param {*} DeviceCpu
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
module.exports = function AddLoginHistory(UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, Time, Date, callback) { //accessed by /Login
  var item1 = Models.LoginHistory.build({
    UserAccountID: UserAccountID,
    IP: IP,
    DeviceName: DeviceName,
    DeviceRam: DeviceRam,
    DeviceCpu: DeviceCpu,
    Time: Time,
    Date: Date
  });
  Models.LoginHistory.sync({
    alter: true,
    /*force:true*/
  }); //force recreates deletes old table
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} LoginHistoryID
 * @param {*} UserAccountID
 * @param {*} IP
 * @param {*} DeviceName
 * @param {*} DeviceRam
 * @param {*} DeviceCpu
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
module.exports = function LoginHistoryUpdate(LoginHistoryID, UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, Time, Date, callback) {
  Models.LoginHistory.update({
      IP: IP,
      DeviceName: DeviceName,
      DeviceRam: DeviceRam,
      DeviceCpu: DeviceCpu,
      Time: Time,
      Date: Date
    }, {
      where: {
        LoginHistoryID: LoginHistoryID,
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {

      console.log("Error Updating " + error);
      callback(undefined);
    });
}