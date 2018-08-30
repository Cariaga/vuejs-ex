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
 * @param {*} callback
 */
module.exports.BlackListAll = function BlackListAll(callback) {
  Models.BlackList.sync();
  let result = Models.BlackList.findAll({
    where: {
      BlackListID: {
        ne: null //not null
      }
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
  });
}

module.exports.BlackListUserAccountID = function BlackListUserAccountID(UserAccountID, callback) {
  Models.BlackList.sync();
  let result = Models.BlackList.findAll({
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
  });
}

/**
 *
 *
 * @param {*} BlackListID
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} Title
 * @param {*} Description
 * @param {*} ReportDate
 * @param {*} ReleaseDate
 * @param {*} callback
 */
module.exports.BlackListUpdate = function BlackListUpdate(BlackListID, UserAccountID, Status, Title, Description, ReportDate, ReleaseDate, callback) { //FULL Update For Blacklist
  Models.BlackList.update({
      UserAccountID: UserAccountID,
      Status: Status,
      Title: Title,
      Description: Description,
      ReportDate: ReportDate,
      ReleaseDate: ReleaseDate
    }, {
      where: {
        BlackListID: BlackListID,
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    }).catch(error => {
      console.log("Error Updating BlackList with 8 params");
      callback(undefined);
    });
}
/**
 *
 *
 * @param {*} BlackListID
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} callback
 */
module.exports.BlackListStatusUpdate = function BlackListStatusUpdate(BlackListID, UserAccountID, Status, callback) {
  Models.BlackList.update({
      Status: Status
    }, {
      where: {
        BlackListID: BlackListID,
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating BlackList param 4");
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Title
 * @param {*} Status
 * @param {*} Description
 * @param {*} ReportDate
 * @param {*} ReleaseDate
 * @param {*} callback
 */
module.exports.AddBlackList = function AddBlackList(UserAccountID, Title, Status, Description, ReportDate, ReleaseDate, callback) {
  var item1 = Models.BlackList.build({
    UserAccountID: UserAccountID,
    Title: Title,
    Status: Status,
    Description: Description,
    ReportDate: ReportDate,
    ReleaseDate: ReleaseDate
  });
  Models.BlackList.sync({
    alter: true /*,force:true*/
  }); //Force true to recreate table
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });
}