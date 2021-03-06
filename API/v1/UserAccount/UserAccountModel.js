var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");


module.exports.PrivilegeUpdate = function PrivilegeUpdate(UserAccountID, Privilege, callback) {
  let _UserAccountID = UserAccountID;
  let _Privilege =Privilege;
  let query ="UPDATE `sampledb`.`useraccounts` SET `Privilege` = \'"+_Privilege+"\' WHERE (`UserAccountID` = \'"+_UserAccountID+"\');";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      callback(response);
    } else {
      callback(undefined);
    }
  });
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
/*module.exports.AddUserAccount = function AddUserAccount(UserAccountID, AccessID, UserName, Password, ValidKey, callback) {
  let query = 
  `SET @UserAccountID=${UserAccountID};`+
  `SET @AccessID=${AccessID};`+
  `SET @UserName=${UserName};`+
  `SET @Password=${Password};`+
  `SET @Verify=false`+
  `SET @ValidKey=${ValidKey};`+
  `SET @RegisteredDateTime=now();`+
  `SET @OnlineStatus='Offline'`+
  `SET @Verified=false`+
  "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`,`Verified`) "+
  "VALUES (@UserAccountID, @UserName, @Password, @RegisteredDateTime,@Verified);";
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });*/
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
    });
}*/
/*
module.exports.LoginHistoryUserAccountID = function LoginHistoryUserAccountID(UserAccountID, callback) {
  let query = `SET @UserAccountID=${UserAccountID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });*/
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
  });
}*/
/*
module.exports.LoginHistoryUserAccountIDLatest = function LoginHistoryUserAccountIDLatest(UserAccountID, callback) {
  let query = `SET @UserAccountID=${UserAccountID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });*/
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
  });
}*/

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
/*
module.exports.AddUserAccount = function AddUserAccount(UserAccountID, AccessID, UserName, Password, Verify, ValidKey, callback) {
  let query = `SET @UserAccountID=${UserAccountID};`+
  `SET @AccessID=${AccessID};`+
  `SET @UserName=${UserName};`+
  `SET @Password=${Password};`+
  `SET @Verify=${Verify};`+
  `SET @ValidKey=${ValidKey};`+
  `SET @RegisteredDateTime=now();`+
  "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `AccessID`, `Password`, `RegisteredDateTime`) "+
  "VALUES (@UserAccountID, @UserName, @AccessID, @Password, @RegisteredDateTime); ";
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });*/
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
    });
}
*/
