let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let RegisterModel = require("../Register/RegisterModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
module.exports = function (app) {

  app.get('/Api/v1/Register/Add/UserName/:UserName/Password/:Password/Name/:Name/SurName/:SurName/Email/:Email/PhoneNumber/:PhoneNumber/BankName/:BankName/SecurityCode/:SecurityCode/Valid/:Valid/Expiration/:Expiration/', function (req, res) {
  let Name = req.params.Name;
  let SurName = req.params.SurName;
  let UserName = req.params.UserName;
  let Password = req.params.Password;
  let Email = req.params.Email;
  let PhoneNumber = req.params.PhoneNumber;
  let BankName = req.params.BankName;
  let AccountNumber = req.params.AccountNumber;
  let SecurityCode = req.params.SecurityCode;
  let Valid = req.params.Valid;
  let Expiration = req.params.Expiration;

    if (!isNullOrEmpty(UserName)) {
      if (!isNullOrEmpty(Password)) {
        if (!isNullOrEmpty(Name)) {
          if (!isNullOrEmpty(SurName)) {
            if (!isNullOrEmpty(Name)) {
              if(!isNullOrEmpty(Valid)){
                if(!isNullOrEmpty(Email)){
                  if(!isNullOrEmpty(Expiration)){
                    if(!isNullOrEmpty(PhoneNumber)){
                   
                      let UserAccountID = uuidv4();
                      let ValidKey = uuidv4();
                      let AccessID = "1";
                      RegisterModel.RegisterAccount(UserAccountID, AccessID, UserName, Password, ValidKey,Email,PhoneNumber,BankName,AccountNumber,SecurityCode,Valid,Expiration, function (response) {
                        if (response != undefined) {
                          res.send(response);
                        } else {
                          res.send({
                            AddUserAccountFailed: true
                          });
                        }
                      });

                    }else{
                      res.send({PhoneNumberMissing});
                    }
                  }else{
                    res.send({Expiration});
                  }
                }else{
                  res.send({Email});
                }
              }else{
                res.send({ValidCard});
              }
            }else{
              res.send({Name});
            }
          }else{
            res.send({SurName});
          }
        }else{
          res.send({Name});
        }
      }else{
        res.send({Password});
      }
    }else{
      res.send({UserName});
    }
  });
  app.get('/registerheadoffice', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserName = req.query.UserName;
    let Password = req.query.Password;
    let Name = req.query.Name;
    let Surname = req.query.Surname;
    let Email = req.query.Email;
    let PhoneNumber = ""; //this was never used
    let TelephoneNumber = ""; //this was never used
    let Description = req.query.Description;
    if (!isNullOrEmpty(UserName)) {
      if (!isNullOrEmpty(Password)) {
        if (!isNullOrEmpty(Name)) {
          if (!isNullOrEmpty(Surname)) {
            if (!isNullOrEmpty(Email)) {
              let isAccountAlreadyExist = false;
              let isEmailAlreadyExist = false;
              let UserAccountID = false;
              async.series([myFirstFunction, mySecondFunction], function (error, result) {
                let CurrentTime = undefined;
                let CurrentDate = undefined;
                getCurrentTime(function (response) {
                  CurrentTime = response;
                });
                getCurrentDate(function (response) {
                  CurrentDate = response;
                });
                var schema = new passwordValidator();
                schema
                  .is().min(8)
                  .has().uppercase() // Must have uppercase letters
                  .has().lowercase() // Must have lowercase letters
                  .has().digits() // Must have digits
                  .has().not().spaces() // Should not have spaces
                let IsInvalidPassword = !schema.validate(Password);
                let IsInvalidEmail = !validator.isEmail(Email);
                let AddAccountErrorMessage = "";
                let AddUserInfoErrorMessage = "";
                let AddDistributorErrorMessage = "";
                if (IsInvalidEmail == false) {
                  if (IsInvalidPassword == false) {
                    let UUIDUserAccountID = uuidv4();
                    let UUIDKey = uuidv4();
                    async.series([InsertUserAccount, InsertUserInfo, InsertHeadOffice], function (error, result2) {
                      if (AddAccountErrorMessage == "") {
                        if (AddUserInfoErrorMessage == "") {
                          if (AddDistributorErrorMessage == "") {
                            let To = Email;
                            let From = '';
                            let Title = 'Email Verification';
                            let VerificationURL = 'http://nodejs-mongo-persistent-holdem1.4b63.pro-ap-southeast-2.openshiftapps.com/Verify?UserName=' + UserName + '&VerifyKey=' + UUIDKey;
                            SendMail(To, From, Title, VerificationURL);
                            res.send({
                              Done: "Done"
                            });
                          } else {
                            res.send({
                              Failed: "headoffice Insert"
                            });
                          }
                        } else {
                          res.send({
                            Failed: "UserInfo Insert"
                          });
                        }
                      } else {
                        res.send({
                          Failed: "UserAccount Insert"
                        });
                      }
                    });

                    function InsertUserAccount(callback1) {

                      AddUserAccount(UUIDUserAccountID, "AccessID", UserName, Password, false, UUIDKey, CurrentDate, CurrentTime, function (response) {
                        if (response == "Inserted") {
                          console.log("Insert UserAccount");
                          callback1(null, '1');
                        } else {
                          console.log("Failed UserAccount" + response);
                          AddAccountErrorMessage = response;
                          callback1(null, '1');
                        }
                      });
                    }

                    function InsertUserInfo(callback2) {
                      AddUserInfo(UUIDUserAccountID, Email, PhoneNumber, TelephoneNumber, function (response) {
                        if (response == "Inserted") {
                          console.log("Insert UserInfo");
                          callback2(null, '2');
                        } else {
                          console.log("Failed UserInfo" + response);
                          AddUserInfoErrorMessage = response;
                          callback2(null, '2');
                        }
                      });
                    }

                    function InsertHeadOffice(callback3) { //headoffice dosn't have a parent ID like Distributor Shop and Player
                      AddHeadOffice(UUIDUserAccountID, Name, Description, function (response) {
                        if (response == "Inserted") {
                          console.log("Insert headoffice");
                          callback3(null, '3');
                        } else {
                          console.log("Failed headoffice" + response);
                          AddDistributorErrorMessage = response;
                          callback3(null, '3');
                        }
                      });
                    }

                  } else {
                    res.send({
                      WeekPassword: true
                    });
                  }
                } else {
                  res.send({
                    EmailInvalid: true
                  });
                }

              });

              function myFirstFunction(callback) {
                DBCheck.isUserNameExist(UserName, function (response3) {
                  let obj = response3;
                  if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0) {
                    isAccountAlreadyExist = true;
                    UserAccountID = obj[0].UserAccountID;
                    callback(null, 1);
                  } else {
                    callback(null, 1);
                  }
                });
              }

              function mySecondFunction(callback2) {
                DBCheck.UserInfoEmailExist(Email, function (response) {
                  let obj = response;
                  if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].Email == Email) {
                    isEmailAlreadyExist = true;
                    callback2(null, 2);

                  } else {
                    isEmailAlreadyExist = false;
                    callback2(null, 2);
                  }
                });
              }

            } else {
              res.send({
                EmailMissing: true
              });
            }
          } else {
            res.send({
              SurnameMissing: true
            });
          }
        } else {
          res.send({
            NameMissing: true
          });
        }
      } else {
        res.send({
          PasswordMissing: true
        });
      }
    } else {
      res.send({
        UserNameMissing: true
      });
    }
  });
}