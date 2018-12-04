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
    "SELECT UserAccountID,Verified,RegisteredDateTime FROM sampledb.useraccounts where UserName=\'"+_UserName+"\'and Password=\'"+_Password+"\';";

    async.waterfall([Q1], function (err, response) {
      let query2 =
      "INSERT INTO `sampledb`.`loginhistories` (`IP`, `UserAccountID`, `DeviceName`, `DeviceRam`, `DeviceCpu`, `LoginDateTime`) "+
      "VALUES (\'"+_IP+"\',\'"+_UserAccountID+"\',\'"+_DeviceName+"\',\'"+_DeviceRam+"\',\'"+_DeviceCpu+"\',now());";
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
/*
module.exports.LoginAccount = function(UserName,Password,callback){
  let _UserName =UserName;
  let _Password =Password;  
    function QueryLoginAccount() {
     let Query = 
    "SELECT  BL.BlackListID ,UA.UserAccountID ,UA.OnlineStatus,UA.Verified,UI.Email,BL.BlackListID,BL.Reason,BL.Status,BL.Title,BL.ReportDate,BL.ReleaseDate,PL.ShopID,PL.UserAccountID,DR.DistributorID,DR.UserAccountID,HO.HeadOfficeID,HO.UserAccountID "+
    "FROM sampledb.useraccounts as UA "+
    "LEFT JOIN sampledb.userinfos as UI ON UA.UserAccountID = UI.UserAccountID "+
    "LEFT JOIN sampledb.blacklist as BL ON UA.UserAccountID = BL.UserAccountID "+
    "left Join sampledb.players as PL on UA.UserAccountID = PL.UserAccountID "+
    "left Join sampledb.distributors as DR on UA.UserAccountID = DR.UserAccountID "+
    "left Join sampledb.headoffices as HO on UA.UserAccountID = HO.UserAccountID "+
    "where UA.UserName =\'"+_UserName+"\' and UA.Password= \'"+_Password+"\' "+
    "order by BL.ReportDate desc limit 1; ";
      console.log(Query);
      return new Promise(resolve => {
        DBConnect.DBConnect(Query, function (response) {
          console.log(response);
          if (response != undefined) {
              resolve(response);
            } else {
              resolve(undefined);
            }
        });
      });
    }

    function QueryAccountType() {
      let Query = 
     "SELECT * FROM sampledb.useraccount_types where useraccount_types.`UserName`=\'"+_UserName+"\'";
       return new Promise(resolve => {
         DBConnect.DBConnect(Query, function (response) {
           if (response != undefined) {
               resolve(response);
             } else {
              resolve(undefined);
             }
         });
       });
     }

    async function RunAsync() {
      console.log('calling');
      let finalresult = [{}];
      let result = await QueryLoginAccount();
      if(result!=undefined){
        let result2 = await QueryAccountType();
        finalresult[0].UserAccountID = result[0].UserAccountID;
        
        finalresult[0].Verified = result[0].Verified;
        finalresult[0].Email = result[0].Email;
        finalresult[0].Description = result[0].Description;
        finalresult[0].Online = result[0].OnlineStatus;
        finalresult[0].Status = result[0].Status;
        finalresult[0].Title = result[0].Title;
        finalresult[0].ReportDate = result[0].ReportDate;
        finalresult[0].AccountType = result2[0].AccountType;
        callback(finalresult);
      }else{
        callback(undefined);
      }
     
      
      //console.log(finalresult);
   
      
    }
    RunAsync();
}*/

module.exports.LoginAccount = function(UserName,Password,callback){
  let _UserName =UserName;
  let _Password =Password;  
    function QueryLoginAccount() {
     let Query = 
    "SELECT BL.BlackListID, UA.UserAccountID, UA.UserName, UA.OnlineStatus, UA.Verified, UA.Privilege, UI.Email, BL.BlackListID, BL.Reason, BL.Status, BL.Title, BL.ReportDate, BL.ReleaseDate, PL.Commission PlayerCommission, PL.ShopID, SH.Commission ShopCommission, SH.DistributorID, DR.Commission DistributorCommission, DR.HeadOfficeID, HO.Commission HeadOfficeCommission, OHO.OperatingHeadOfficeID, OHO.Commission OperatingHeadOfficeCommission FROM sampledb.useraccounts AS UA LEFT JOIN sampledb.userinfos AS UI ON UA.UserAccountID = UI.UserAccountID LEFT JOIN sampledb.blacklist AS BL ON UA.UserAccountID = BL.UserAccountID LEFT JOIN sampledb.players AS PL ON UA.UserAccountID = PL.UserAccountID LEFT JOIN sampledb.shops AS SH ON UA.UserAccountID = SH.UserAccountID LEFT JOIN sampledb.distributors AS DR ON UA.UserAccountID = DR.UserAccountID LEFT JOIN sampledb.headoffices AS HO ON UA.UserAccountID = HO.UserAccountID LEFT JOIN sampledb.operatingheadoffice AS OHO ON UA.UserAccountID = OHO.UserAccountID WHERE UA.UserName = \'"+_UserName+"\' AND UA.Password = \'"+_Password+"\' ORDER BY BL.ReportDate DESC LIMIT 1";

      console.log("LoginAccount : "+ Query);
      return new Promise(resolve => {
        DBConnect.DBConnect(Query, function (response) {
          console.log(response);
          if (response != undefined) {
              resolve(response);
            } else {
              resolve(undefined);
            }
        });
      });
    }

    function QueryAccountType() {
      let Query = 
     "SELECT `UA`.`UserName`,FAT.UserAccountID,IFNULL(FAT.AccountType, 'NoType') as AccountType FROM sampledb.fullaccounttypes as FAT "+
     "Inner Join sampledb.useraccounts as UA on UA.UserAccountID = FAT.UserAccountID where `UA`.`UserName`=\'"+_UserName+"\'; ";
       return new Promise(resolve => {
         DBConnect.DBConnect(Query, function (response) {
           if (response != undefined) {
               resolve(response);
             } else {
              resolve(undefined);
             }
         });
       });
     }

    async function RunAsync() {
      console.log('calling');
      let finalresult = [{}];
      let result = await QueryLoginAccount();
      if(result!=undefined){
        let result2 = await QueryAccountType();
     
      
        finalresult[0].UserAccountID = result[0].UserAccountID;
        finalresult[0].Privilege = result[0].Privilege;
        finalresult[0].Verified = result[0].Verified;
        finalresult[0].Email = result[0].Email;
        finalresult[0].Description = result[0].Description;
        finalresult[0].Online = result[0].OnlineStatus;
        finalresult[0].Status = result[0].Status;
        finalresult[0].Title = result[0].Title;
        finalresult[0].ReportDate = result[0].ReportDate;
        finalresult[0].AccountType = result2[0].AccountType;
        finalresult[0].PlayerCommission = result[0].PlayerCommission;
        
        finalresult[0].ShopID = result[0].ShopID;
        finalresult[0].ShopCommission = result[0].ShopCommission;
        finalresult[0].DistributorID = result[0].DistributorID;
        finalresult[0].DistributorCommission = result[0].DistributorCommission;
        finalresult[0].HeadOfficeID = result[0].HeadOfficeID;
        finalresult[0].HeadOfficeCommission = result[0].HeadOfficeCommission;
        finalresult[0].OperatingHeadOfficeID = result[0].OperatingHeadOfficeID;
        finalresult[0].OperatingHeadOfficeCommission = result[0].OperatingHeadOfficeCommission;

        console.log("------ShopID :"+result[0].ShopID);
        console.log("------DistributorID :"+result[0].DistributorID);
        console.log("------HeadOfficeID :"+result[0].HeadOfficeID);
        console.log("------OperatingHeadOfficeID :"+result[0].OperatingHeadOfficeID);
        callback(finalresult);
      }else{
        callback(undefined);
      }
     
      
      //console.log(finalresult);
   
      
    }
    RunAsync();
}
module.exports.UserAccountIDOFDistributorID = function(DistributorID,callback){
  let _DistributorID = DistributorID;
  let Query = "select UserAccountID from distributors where DistributorID=\'"+_DistributorID+"\'";
  DBConnect.DBConnect(Query, function (response) {
    if (response != undefined) {
      callback(response);
      } else {
        callback(undefined);
      }
  });
}
module.exports.UserAccountIDOFShopID = function(ShopID,callback){
  let _ShopID = ShopID;
  let Query = "select UserAccountID from shops where ShopID=\'"+_ShopID+"\'";
  console.log(Query);
  DBConnect.DBConnect(Query, function (response) {
    if (response != undefined) {
      callback(response);
      } else {
        callback(undefined);
      }
  });
}
module.exports.UserAccountIDOFHeadOfficeID = function(HeadOfficeID,callback){
  let _HeadOfficeID = HeadOfficeID;
  let Query = "select UserAccountID from headoffices where HeadOfficeID=\'"+_HeadOfficeID+"\'";
  DBConnect.DBConnect(Query, function (response) {
    if (response != undefined) {
      callback(response);
      } else {
        callback(undefined);
      }
  });
}

module.exports.UserAccountIDOFOperatingHeadOffice = function(OperatingHeadOfficeID,callback){
  let _OperatingHeadOfficeID = OperatingHeadOfficeID;
  let Query = "select UserAccountID from operatingheadoffice where OperatingHeadOfficeID=\'"+_OperatingHeadOfficeID+"\'";
  console.log(Query);
  DBConnect.DBConnect(Query, function (response) {
    if (response != undefined) {
      callback(response);
      } else {
        callback(undefined);
      }
  });
}

module.exports.SubAccount = function(UserName,Password,callback){
  let _UserName = UserName;
  let _Password = Password;
  let Query = "SELECT SA.SubAccountID,SA.UserAccountID,SA.MainUserAccountID,SA.AccessID,AC.AccessName,AC.AccessTags,UA.UserName FROM sampledb.subaccounts as SA join sampledb.UserAccounts as UA on UA.UserAccountID=SA.UserAccountID join sampledb.accesscontrol as AC on AC.AccessID=SA.AccessID where UA.UserName = '"+_UserName+"' and UA.Password = \'"+_Password+"\';";
  console.log(Query);
  DBConnect.DBConnect(Query, function (response) {
    if (response != undefined) {
      callback(response);
      } else {
        callback(undefined);
      }
  });
}