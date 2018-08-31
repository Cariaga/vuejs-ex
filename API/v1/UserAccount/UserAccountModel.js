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
 * @param {*} AccessID
 * @param {*} UserName
 * @param {*} Password
 * @param {*} Verify
 * @param {*} ValidKey
 * @param {*} RegisteredDate
 * @param {*} RegisteredTime
 * @param {*} callback
 */
<<<<<<< HEAD
module.exports.AddUserAccount = function AddUserAccount(UserAccountID, AccessID, UserName, Password, Verify, ValidKey, callback) {
  let query = 
  `SET @UserAccountID=${UserAccountID};`+
`SET @AccessID=${AccessID};`+
`SET @UserName=${UserName};`+
`SET @Password=${Password};`+
`SET @Verify=${Verify};`+
`SET @ValidKey=${ValidKey};`+
`SET @RegisteredDate=date(now());`+
`SET @RegisteredTime=time(now());`+
"INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDate`, `OnlineStatus`) VALUES (@UserAccountID, @UserName, @Password, @RegisteredDate, @OnlineStatus);"

  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
=======
module.exports.AddUserAccount = function AddUserAccount(UserAccountID, AccessID, UserName, Password, Verify, ValidKey, RegisteredDate, RegisteredTime, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @AccessID=${AccessID};` +
    `SET @UserName=${UserName};` +
    `SET @Password=${Password};` +
    `SET @Verify=${Verify};` +
    `SET @ValidKey=${ValidKey};` +
    `SET @RegisteredDate=${RegisteredDate};` +
    `SET @RegisteredTime=${RegisteredTime};` +
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
>>>>>>> 0c5eb11e5bb3239533287f244014d9f0f16a53a2
  /*var item1 = Models.UserAccount.build({
    UserAccountID: UserAccountID,
    AccessID: AccessID,
    UserName: UserName,
    Password: Password,
    Verify: Verify,
    ValidKey: ValidKey,
    RegisteredDate: RegisteredDate,
    RegisteredTime: RegisteredTime
  });
  //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
  Models.UserAccount.sync({
    alter: true 
  });
  item1.save()
    .then(Success => {

      console.log("----AddUserAccount Start-----");
      console.log(Success);
      console.log("----AddUserAccount End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting UserAccountID:" + UserAccountID + " \n AccessID:" + AccessID + "\n UserName:" + UserName + "\n Password:" + Password + "\n Verify:" + Verify + "\n ValidKey:" + ValidKey + "\n RegisteredDate:" + RegisteredDate + "\n RegisteredTime:" + RegisteredTime);
      callback(undefined);
    });*/
}

module.exports.LoginHistoryUserAccountID = function LoginHistoryUserAccountID(UserAccountID, callback) {
  let query = `SET @UserAccountID=${UserAccountID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.LoginHistory.sync();
  let result = Models.LoginHistory.findAll({
    where: {
      UserAccountID: UserAccountID
    },
    order: [
      ['updatedAt', 'DESC']
    ]
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

module.exports.LoginHistoryUserAccountIDLatest = function LoginHistoryUserAccountIDLatest(UserAccountID, callback) {
  let query = `SET @UserAccountID=${UserAccountID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.LoginHistory.sync();
  let result = Models.LoginHistory.findAll({
    where: {
      UserAccountID: UserAccountID
    },
    limit: 1,
    order: [
      ['updatedAt', 'DESC']
    ]
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
<<<<<<< HEAD
}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} VerifiedStatus
 * @param {*} callback
 */
module.exports.VerifyAccountUserAccountID = function VerifyAccountUserAccountID(UserAccountID, VerifiedStatus, callback) { // Verification With UserAccountID // Forcing Account To be Verified // Via UserAccountID
  let query = 
  `SET @UserAccountID=${UserAccountID};`+
  `SET @VerifiedStatus=${VerifiedStatus};`+

  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*Models.UserAccount.update({
      Verify: VerifiedStatus
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
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} AccessID
 * @param {*} UserName
 * @param {*} Password
 * @param {*} Verify
 * @param {*} ValidKey
 * @param {*} RegisteredDate
 * @param {*} RegisteredTime
 * @param {*} callback
 */
module.exports.AddUserAccount = function AddUserAccount(UserAccountID, AccessID, UserName, Password, Verify, ValidKey, RegisteredDate, RegisteredTime, callback) {
  let query = `SET @UserAccountID=${UserAccountID};`+
  `SET @AccessID=${AccessID};`+
  `SET @UserName=${UserName};`+
  `SET @Password=${Password};`+
  `SET @Verify=${Verify};`+
  `SET @ValidKey=${ValidKey};`+
  `SET @RegisteredDate=${RegisteredDate};`+
  `SET @RegisteredTime=${RegisteredTime};`+
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*var item1 = Models.UserAccount.build({
    UserAccountID: UserAccountID,
    AccessID: AccessID,
    UserName: UserName,
    Password: Password,
    Verify: Verify,
    ValidKey: ValidKey,
    RegisteredDate: RegisteredDate,
    RegisteredTime: RegisteredTime
  });
  //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
  Models.UserAccount.sync({
    alter: true
  });
  item1.save()
    .then(Success => {

      console.log("----AddUserAccount Start-----");
      console.log(Success);
      console.log("----AddUserAccount End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting UserAccountID:" + UserAccountID + " \n AccessID:" + AccessID + "\n UserName:" + UserName + "\n Password:" + Password + "\n Verify:" + Verify + "\n ValidKey:" + ValidKey + "\n RegisteredDate:" + RegisteredDate + "\n RegisteredTime:" + RegisteredTime);
      callback(undefined);
    });*/
=======
>>>>>>> 0c5eb11e5bb3239533287f244014d9f0f16a53a2
}