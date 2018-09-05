var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');
module.exports.AddLoginHistory = function(UserName,Password, IP, DeviceName, DeviceRam, DeviceCpu,callback){
    let _UserAccountID = "";
    let _UserName = UserName;
    let _Password = Password;
    let _IP = IP;
    let _DeviceName = DeviceName;
    let _DeviceRam = DeviceRam;
    let _DeviceCpu = DeviceCpu;
    let query =
    "SELECT UserAccountID,Verified,RegisteredDateTime FROM sampledb.useraccounts where UserName='"+_UserName+"'and Password='"+_Password+"';";

    async.waterfall([Q1], function (err, response) {
      let query2 =
      "INSERT INTO `sampledb`.`loginhistories` (`IP`, `UserAccountID`, `DeviceName`, `DeviceRam`, `DeviceCpu`, `LoginDateTime`) "+
      "VALUES ('"+_IP+"','"+_UserAccountID+"','"+_DeviceName+"','"+_DeviceRam+"','"+_DeviceCpu+"',now());";
        DBConnect.DBConnect(query2, function (response) {
            if (response != undefined) {
                console.log(response);
                callback(response);
              } else {
                //callback(undefined);
              }
          });
      });
      function Q1(callback) {
        DBConnect.DBConnect(query, function (response) {
          
          if (response != undefined) {
            _UserAccountID = response[0].UserAccountID;
            console.log(response);
         
            callback(null,response);
          } else {
           // callback(undefined);
          }
        });
      }
      
}
module.exports.LoginAccount = function(UserName,Password,callback){
  let _UserName =UserName;
  let _Password =Password;  
    function QueryLoginAccount() {
     let Query = 
    "SELECT  BL.BlackListID ,UA.UserAccountID ,UA.OnlineStatus,UA.Verified,UI.Email,BL.BlackListID,BL.Description,BL.Status,BL.Title,BL.ReportDate,BL.ReleaseDate "+
    "FROM sampledb.useraccounts as UA "+
    "LEFT JOIN sampledb.userinfos as UI ON UA.UserAccountID = UI.UserAccountID "+
    "LEFT JOIN sampledb.blacklist as BL ON UA.UserAccountID = BL.UserAccountID "+
    "where UA.UserName ='"+_UserName+"' and UA.Password= '"+_Password+"' "+
    "order by BL.ReportDate desc limit 1; ";
      console.log(Query);
      return new Promise(resolve => {
        DBConnect.DBConnect(Query, function (response) {
          if (response != undefined) {
              resolve(response);
            } else {
              //callback(undefined);
            }
        });
      });
    }

    function QueryAccountType() {
      let Query = 
     "SELECT FAT.UserAccountID,IFNULL(FAT.AccountType, 'NoType') as AccountType,UA.UserName FROM sampledb.fullaccounttypes as FAT "
     "Inner Join UserAccounts as UA on UA.UserAccountID = FAT.UserAccountID where UA.UserName='U6'; ";
       return new Promise(resolve => {
         DBConnect.DBConnect(Query, function (response) {
           if (response != undefined) {
               resolve(response);
             } else {
               //callback(undefined);
             }
         });
       });
     }

    async function RunAsync() {
      console.log('calling');
      var result = await QueryLoginAccount();
      var result2 = await QueryAccountType();
      console.log(result);
      console.log(result2);
      callback('done');
    }
    RunAsync();
}
