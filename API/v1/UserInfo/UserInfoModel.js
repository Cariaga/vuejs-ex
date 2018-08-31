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
 * @param {*} UserAccountID
 * @param {*} Email
 * @param {*} PhoneNumber
 * @param {*} TelephoneNumber
 * @param {*} callback
 */
module.exports.UserInfoUpdate = function UserInfoUpdate(UserAccountID, Email, PhoneNumber, TelephoneNumber, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Email=${Email};` +
    `SET @PhoneNumber=${PhoneNumber};` +
    `SET @TelephoneNumber=${TelephoneNumber};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.UserInfo.sync(  );
  Models.UserInfo.update({
      Email: Email,
      PhoneNumber: PhoneNumber,
      TelephoneNumber: TelephoneNumber
    }, {
      where: {
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      console.log("Updated");
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });*/
}

module.exports.UserInfoUserAccountID = function UserInfoUserAccountID(UserAccountID, callback) {
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
  /*Models.UserInfo.sync();
  let result = Models.UserInfo.findAll({
    where: {
      UserAccountID: UserAccountID
    }
  }).then(function (result) {
    let Data = result.map(function (item) {
      return item;
    });
    if (Data.length > 0) {
      callback(Data);
    } else {
      callback(undefined);
    }
  }).catch(function (result) { //catching any then errors
    console.log("Error " + result);
    callback(undefined);
  });*/
}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
module.exports.UserInfoUserAccountID = function UserInfoUserAccountID(UserAccountID, callback) {
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
  /*Models.UserInfo.sync();
  let result = Models.UserInfo.findAll({
    where: {
      UserAccountID: UserAccountID
    }
  }).then(function (result) {
    let Data = result.map(function (item) {
      return item;
    });
    if (Data.length > 0) {
      callback(Data);
    } else {
      callback(undefined);
    }
  }).catch(function (result) { //catching any then errors
    console.log("Error " + result);
    callback(undefined);
  });*/
}

module.exports.UserInfoUpdateEmail = function UserInfoUpdateEmail(UserAccountID, Email, callback) { // Verification With UserAccountID // Forcing Account To be Verified // Via UserAccountID
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Email=${Email};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.UserInfo.sync(); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.UserInfo.update({
      Email: Email
    }, {
      where: {
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })

    .catch(error => {
      console.log("Error Updating " + error);
      callback(undefined);
    });*/
}
module.exports.AddUserInfo = function AddUserInfo(UserAccountID, Email, PhoneNumber, TelephoneNumber, callback) {

  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Email=${Email};` +
    `SET @PhoneNumber=${PhoneNumber};` +
    `SET @TelephoneNumber=${TelephoneNumber};` +
    ""+
    ""+
    ""+
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.UserInfo.sync( );
  var item1 = Models.UserInfo.build({
    UserAccountID: UserAccountID,
    Email: Email,
    PhoneNumber: PhoneNumber,
    TelephoneNumber: TelephoneNumber
  });
  Models.UserInfo.sync(); //only use force true if you want to destroy replace table
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {

      console.log("error inserting " + error);
      callback(undefined);
    });*/
}