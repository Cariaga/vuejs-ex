let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var LoginHistoryModel = require('./LoginHistoryModel');
module.exports = function (app) {
  app.get('/Login', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // Usage /Login?UserName=Username21441&Password=awAF12441124&DeviceUUID=DeviceUUID&IP=IP&DeviceName=DeviceName&DeviceRam=DeviceRam&DeviceCpu=DeviceCpu&OperatingSystem=OperatingSystem&GraphicsDevice=GraphicsDevice&Time=Time&Date=Date
    let UserName = req.query.UserName;
    let Password = req.query.Password;
    let DeviceUUID = req.query.DeviceUUID;
    let IP = req.query.IP;
    let DeviceName = req.query.DeviceName;
    let DeviceRam = req.query.DeviceRam;
    let DeviceCpu = req.query.DeviceCpu;
    let OperatingSystem = req.query.OperatingSystem;
    let GraphicsDevice = req.query.GraphicsDevice;

    let DateTime = req.query.DateTime; //2018-06-27 01:57:17
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(IP)) {
        if (!isNullOrEmpty(DeviceName)) {
          if (!isNullOrEmpty(DeviceRam)) {
            if (!isNullOrEmpty(DeviceCpu)) {
              if (!isNullOrEmpty(DateTime)) {
                LoginHistoryModel.AddLoginHistory(UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, DateTime, Date, function (response3) {

                });
              } else {
                res.send({
                  UserAccountIDMissing: true
                })
              }
            } else {
              res.send({
                IPMissing: true
              })
            }
          } else {
            res.send({
              DeviceNameMissing: true
            })
          }
        } else {
          res.send({
            DeviceRamMissing: true
          })
        }
      } else {
        res.send({
          DeviceCpuMissing: true
        })
      }
    } else {
      res.send({
        DateTimeMissing: true
      })
    }
   

    /* if (!isNullOrEmpty(DeviceUUID) &&
       !isNullOrEmpty(IP) &&
       !isNullOrEmpty(DeviceName) &&
       !isNullOrEmpty(DeviceRam) &&
       !isNullOrEmpty(DeviceCpu) &&
       !isNullOrEmpty(OperatingSystem) &&
       !isNullOrEmpty(GraphicsDevice) &&
       !isNullOrEmpty(Time) &&
       !isNullOrEmpty(Date)) {
       if (!isNullOrEmpty(UserName)) {
         if (!isNullOrEmpty(Password)) {
           let UserAccountID = "";
           let AccountStatus = "";
           let AccountType = undefined;
           let AccountVerified = false;
           let Email = undefined;
           let PhoneNumber = undefined;
           let TelephoneNumber = undefined;
           let AccessType = undefined;
           let AccessID = undefined;
           async.series([
             UserNameInternalValidate,
             UserAccountInternalValidate,
             UserAccountBlockedInternalValidate,
             AccountTypeInternalValidate,
             GetUserInfoInternalValidate
           ], function (err, result) { //final function
             if (UserAccountID != "") {
               if (AccountVerified == true) {
                 if (AccountStatus != "Blocked") {
                   console.log('done');
                   // result now equals 'done'
                   console.log('3');
                   Models.UserAccount.sync(); //makes sure table exist and syncs it
                   console.log('4');
                   LoginHistoryModel.AddLoginHistory(UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, Time, Date, function (response3) {
                     console.log('5');
                     console.log(response3);
                     if (AccountType == "HeadOffice") {
                       console.log('6 HeadOffice');
                       // we need diffrent Data for diffrent AccountType
                       let Data = {
                         Status: "Verified",
                         Controller: "/Login",
                         UserAccountID: UserAccountID,
                         Solution: "No Issue",
                         UserName: UserName,
                         AccountStatus: AccountStatus,
                         AccountType: AccountType,
                         AccountVerified: AccountVerified,
                         Name: "",
                         SurName: "",
                         Email: Email,
                         PhoneNumber: PhoneNumber,
                         TelephoneNumber: TelephoneNumber,
                         AccessID: AccessID
                       }
                       res.send(Data);
                     } else if (AccountType == "Distributor") {
                       console.log('6 Distributor');
                       // we need diffrent Data for diffrent AccountType
                       let Data = {
                         Status: "Verified",
                         Controller: "/Login",
                         UserAccountID: UserAccountID,
                         Solution: "No Issue",
                         UserName: UserName,
                         AccountStatus: AccountStatus,
                         AccountType: AccountType,
                         AccountVerified: AccountVerified,
                         Name: "",
                         SurName: "",
                         Email: Email,
                         PhoneNumber: PhoneNumber,
                         TelephoneNumber: TelephoneNumber,
                         AccessID: AccessID
                       }
                       res.send(Data);
                     } else if (AccountType == "Shop") {
                       console.log('6 Shop');
                       // we need diffrent Data for diffrent AccountType
                       let Data = {
                         Status: "Verified",
                         Controller: "/Login",
                         UserAccountID: UserAccountID,
                         Solution: "No Issue",
                         UserName: UserName,
                         AccountStatus: AccountStatus,
                         AccountType: AccountType,
                         AccountVerified: AccountVerified,
                         Name: "",
                         SurName: "",
                         Email: Email,
                         PhoneNumber: PhoneNumber,
                         TelephoneNumber: TelephoneNumber,
                         AccessID: AccessID
                       }
                       res.send(Data);
                     } else if (AccountType == "Player") {
                       console.log('6 Player');
                       // we need diffrent Data for diffrent AccountType
                       let Data = {
                         Status: "Verified",
                         Controller: "/Login",
                         UserAccountID: UserAccountID,
                         Solution: "No Issue",
                         UserName: UserName,
                         AccountStatus: AccountStatus,
                         AccountType: AccountType,
                         AccountVerified: AccountVerified,
                         Name: "",

                         SurName: "",
                         Email: Email,
                         PhoneNumber: PhoneNumber,
                         TelephoneNumber: TelephoneNumber,
                         AccessID: AccessID
                       }
                       let PlayerExist = false;
                       async.series([PlayerUserAccountIDInternal], function (err, response) {

                         if (PlayerExist == true) {
                           res.send(Data);
                         } else {
                           res.send({
                             PlayerUserAccountExist: false
                           });
                         }

                       });

                       function PlayerUserAccountIDInternal(callback6) {
                         DBCheck.UserInfoUserAccountID(UserAccountID, function (response) {
                           if (response != undefined) {
                             Data.ScreenName = response[0].ScreenName;
                             Data.SurName = response[0].Surname;
                             PlayerExist = true;
                             callback6(null, '1');
                           } else {
                             PlayerExist = false;
                             callback6(null, '1');
                           }
                         });
                       }


                     } else {
                       res.send({
                         UnknownAccoutType: true
                       });
                     }
                   });

                 } else {
                   let Data = {
                     AccountStatus: AccountStatus
                   };
                   res.send(Data);
                 }
               } else {
                 let Data = {
                   AccountVerified: false
                 };
                 res.send(Data);
               }
             } else {
               let Data = {
                 isUserNameExist: false
               };
               res.send(Data)
             }
           });

           function UserNameInternalValidate(callback) { //we retrive the UserAccountID
             console.log('UserNameInternalValidate');
             DBCheck.isUserNameExist(UserName, function (response3) {
               let obj = response3;
               if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].UserName == UserName) {
                 AccessID = obj[0].AccessID;
                 UserAccountID = obj[0].UserAccountID;
                 console.log('UserNameInternalValidate ' + UserAccountID)
                 callback(null, '1');
               } else {
                 UserAccountID = "";
                 callback(null, '1');
               }
             });
           }

           function UserAccountInternalValidate(callback2) {
             console.log('UserAccountInternalValidate');
             DBCheck.isUserAccountVerifiedUserName(UserName, function (response3) {
               let obj = response3;
               if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].UserName == UserName) {
                 AccountVerified = obj[0].Verify;
                 console.log('UserAccountInternalValidate ' + AccountVerified);
                 callback2(null, '2');
               } else {
                 AccountVerified = false;
                 callback2(null, '2');
               }
             });
           }

           function UserAccountBlockedInternalValidate(callback3) {
             console.log('UserAccountBlockedInternalValidate');
             if (!isNullOrEmpty(UserAccountID) && UserAccountID != undefined) {
               DBCheck.isUserAccountBlocked(UserAccountID, function (response) {
                 let obj = response;
                 if (!isNullOrEmpty(obj) && obj != undefined && obj[0].UserAccountID == UserAccountID) {
                   AccountStatus = obj[0].Status;
                   console.log('UserAccountBlockedInternalValidate ' + AccountStatus);

                   callback3(null, '3');
                 } else {
                   AccountStatus = "";
                   callback3(null, '3');
                 }
               });
             } else {
               console.log("Login myThirdFunction Failed UserAccountID Empty");
               callback3(null, '3');
             }
           }

           function AccountTypeInternalValidate(callback4) {
             console.log("AccountTypeInternalValidate");
             if (!isNullOrEmpty(UserAccountID) && UserAccountID != undefined) {
               AccountTypeFullCheck(UserAccountID, function (response) {
                 if (!isNullOrEmpty(response) && response.UnSafeDuplicate == false && response.FoundAccount == true) {
                   // res.send({AccountType:response.AccountType});
                   AccountType = response.AccountType;
                   callback4(null, '4');
                 } else if (!isNullOrEmpty(response) && response.UnSafeDuplicate == true && response.FoundAccount == false) {

                   AccountType = response.AccountType;
                   console.log("AccountTypeInternalValidate Duplicate UserAccountID AccountType" + AccountType);
                   callback4(null, '4');
                 } else {
                   AccountType = response.AccountType;
                   callback4(null, '4');
                 }
               });
             } else {
               console.log("Login myForthFunction Failed UserAccountID Empty");
               callback4(null, '4');
             }
           }

           function GetUserInfoInternalValidate(callback5) {
             console.log("GetUserInfo");
             if (!isNullOrEmpty(UserAccountID) && UserAccountID != undefined) {
               UserInfoUserAccountID(UserAccountID, function (response) {

                 if (response != undefined) {
                   Email = response[0].Email;
                   PhoneNumber = response[0].PhoneNumber;
                   TelephoneNumber = response[0].TelephoneNumber;
                   console.log("GetUserInfo" + AccountType);
                   callback5(null, '5');
                 } else {
                   callback5(null, '5');
                 }
               });
             } else {
               console.log("Login GetUserInfo Failed UserAccountID");
               callback5(null, '5');
             }
           }
           //PlayerUserAccountID

         } else {
           res.send({
             PasswordInvalid: true
           });
         }
       } else {
         res.send({
           UserNameInvalid: true
         });
       }
     } else {
       res.send({
         DeviceInformationsMissing: true
       });
     }*/
  });

  app.get('/Api/v1/Login/:UserName/:Password/', function (req, res) {
    res.send('Not Used use Query Version Instead');
    /*let UserName = req.params.UserName;
      let Password = req.params.Password;
    
      if(!isNullOrEmpty(UserName)&&
      !isNullOrEmpty(Password)){
        let isVerified;
        let result = Models.UserAccount.findAll({ 
          where: {
            UserName: {
              eq: UserName//not null
            },
            Password: {
              eq: Password//not null
            }
         }
        }).then(function(result) {
          let Data = result.map(function(item) {
              return item;
              
          });
          res.send(beautify(Data, null, 2, 100));
        }).catch(function(result) {//catching any then errors
          
          res.send("Error "+result);
    
        })
    
    /*
      }else{
        res.send('no params sent');
      }*/
  });
}