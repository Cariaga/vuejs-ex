let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let RegisterModel = require("../Register/RegisterModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
  /*to sign up a new user account the shop ID must exist */
  app.get('/Api/v1/Register/Add/ScreenName/:ScreenName/UserName/:UserName/Password/:Password/Name/:Name/SurName/:SurName/Email/:Email/PhoneNumber/:PhoneNumber/BankName/:BankName/SecurityCode/:SecurityCode/AccountNumber/:AccountNumber/AccountHolder/:AccountHolder/ShopID/:ShopID/', Management.RouteCalled,Security.rateLimiterMiddleware, function (req, res) {
    let ScreenName = req.params.ScreenName;
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let Email = req.params.Email;
    let PhoneNumber = req.params.PhoneNumber;
    let BankName = req.params.BankName;
    let AccountNumber = req.params.AccountNumber;
    let SecurityCode = req.params.SecurityCode;

    let AccountHolder = req.params.AccountHolder;
    let ShopID = req.params.ShopID;
    let UserAccountID = uuidv4();
    let ValidKey = uuidv4();
    let AccessID = "1";
    let Valid = '';
    let Expiration = '';
    //newer version
    Register(UserAccountID, AccessID, UserName, Password, ScreenName, ValidKey, Email, PhoneNumber, BankName, AccountNumber, SecurityCode, Valid, Expiration, AccountHolder, ShopID, res);
  });
  app.post('/Api/v1/Register/Add/', Management.RouteCalled,Security.rateLimiterMiddleware, function (req, res) {
    let ScreenName = req.body.ScreenName;

    let UserName = req.body.UserName;
    let Password = req.body.Password;
    let Email = req.body.Email;
    let PhoneNumber = req.body.PhoneNumber;
    let BankName = req.body.BankName;
    let AccountNumber = req.body.AccountNumber;
    let SecurityCode = req.body.SecurityCode;

    let AccountHolder = req.body.AccountHolder;
    let ShopUserName = req.body.ShopID;
    let UserAccountID = uuidv4();
    let ValidKey = uuidv4();
    let AccessID = "1";
    let Valid = '';
    let Expiration = '';
    //newer version
    console.log("register test");

    Register(UserAccountID, AccessID, UserName, Password, ScreenName, ValidKey, Email, PhoneNumber, BankName, AccountNumber, SecurityCode, Valid, Expiration, AccountHolder, ShopUserName, res);
  });


  function Register(UserAccountID, AccessID, UserName, Password, ScreenName, ValidKey, Email, PhoneNumber, BankName, AccountNumber, SecurityCode, Valid, Expiration, AccountHolder, ShopUserName, res) {
    console.log("ShopUserName "+ShopUserName);
    if (!isNullOrEmpty(ScreenName)) {
      if (!isNullOrEmpty(UserName)) {
        if (!isNullOrEmpty(Password)) {
          if (!isNullOrEmpty(Email)) {
            if (!isNullOrEmpty(PhoneNumber)) {
              if (!isNullOrEmpty(BankName)) {
                if (!isNullOrEmpty(AccountNumber)) {
                  if (!isNullOrEmpty(SecurityCode)) {
                    if (!isNullOrEmpty(AccountHolder)) {
                      if (!isNullOrEmpty(ShopUserName)) {

                        DBCheck.isUserNameExist(UserName, function (response) { //already exist checking
                          if (response == false) {
                            console.log("isUserNameExist check false");
                            RegisterModel.ShopRecommendation(ShopUserName, function (response) {
                              let ShopID = response[0].ShopID;
                              console.log("ShopID of UserAccount "+ShopID);
                             console.log("ShopIDOfUserAccountID");
                              if(response!=undefined){
                                console.log("ShopID "+ShopID+" ShopUserName "+ShopUserName);
                                RegisterModel.RegisterAccount2(UserAccountID, AccessID, UserName, Password, ScreenName, ValidKey, Email, PhoneNumber, BankName, AccountNumber, SecurityCode, Valid, Expiration, AccountHolder, ShopID, function (response) {
                                  if (response != undefined) {
                                    // res.send(response);
                                    let status = 200;
                                    res.status(status).end(http.STATUS_CODES[status]);
                                  } else {
                                    res.send({
                                      AddUserAccountFailed: true
                                    });
                                  }
                                });
                              }
                           
                            });
                          } else {
                            res.send({
                              UserNameExist: true
                            });
                          }
                        });

                      } else {
                        res.send({
                          InvalidShopUserAccountID: true
                        });
                      }
                    } else {
                      res.send({
                        InvalidAccountHolder: true
                      });
                    }
                  } else {
                    res.send({
                      InvalidSecurityCode: true
                    });
                  }
                } else {
                  res.send({
                    InvalidAccountNumber: true
                  });
                }
              } else {
                res.send({
                  InvalidBankName: true
                });
              }
            } else {
              res.send({
                InvalidPhoneNumber: true
              });
            }
          } else {
            res.send({
              InvalidEmail: true
            });
          }
        } else {
          res.send({
            InvalidPassword: true
          });
        }
      } else {
        res.send({
          InvalidUserName: true
        });
      }
    } else {
      console.log("Invalid Screen Name");
      res.send({
        InvalidScreenName: true
      });
    }
  }


  ///-------old
  /*function Register(Name,SurName,UserName,Password,Email,PhoneNumber,BankName,AccountNumber,SecurityCode,Valid,Expiration,res){
    
    if (!isNullOrEmpty(UserName)) {
      if (!isNullOrEmpty(Password)) {
        if (!isNullOrEmpty(Name)) {
          if (!isNullOrEmpty(SurName)) {
            if (!isNullOrEmpty(Name)) {
              if (!isNullOrEmpty(Valid)) {
                if (!isNullOrEmpty(Email)) {
                  if (!isNullOrEmpty(Expiration)) {
                    if (!isNullOrEmpty(PhoneNumber)) {

                      let UserAccountID = uuidv4();
                      let ValidKey = uuidv4();
                      let AccessID = "1";
                      RegisterModel.RegisterAccount(UserAccountID, AccessID, UserName, Password, ValidKey, Email, PhoneNumber, BankName, AccountNumber, SecurityCode, Valid, Expiration, function (response) {
                        if (response != undefined) {
                          // res.send(response);
                          let status = 200;
                          res.status(status).end(http.STATUS_CODES[status]);
                        } else {
                          res.send({
                            AddUserAccountFailed: true
                          });
                        }
                      });

                    } else {
                      res.send({
                        PhoneNumberMissing
                      });
                    }
                  } else {
                    res.send({
                      Expiration
                    });
                  }
                } else {
                  res.send({
                    Email
                  });
                }
              } else {
                res.send({
                  ValidCard
                });
              }
            } else {
              res.send({
                Name
              });
            }
          } else {
            res.send({
              SurName
            });
          }
        } else {
          res.send({
            Name
          });
        }
      } else {
        res.send({
          Password
        });
      }
    } else {
      res.send({
        UserName
      });
    }
  }
  /*app.get('/Api/v1/Register/Add/UserName/:UserName/Password/:Password/Name/:Name/SurName/:SurName/Email/:Email/PhoneNumber/:PhoneNumber/BankName/:BankName/SecurityCode/:SecurityCode/Expiration/:Expiration/AccountNumber/:AccountNumber/', function (req, res) {
    let Name = req.params.Name;
    let SurName = req.params.SurName;
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let Email = req.params.Email;
    let PhoneNumber = req.params.PhoneNumber;
    let BankName = req.params.BankName;
    let AccountNumber = req.params.AccountNumber;
    let SecurityCode = req.params.SecurityCode;
    let Valid = "OK";//never used
    let Expiration = req.params.Expiration;
    Register(Name,SurName,UserName,Password,Email,PhoneNumber,BankName,AccountNumber,SecurityCode,Valid,Expiration,res);

  });
 /* app.post('/Api/v1/Register/Add/', function (req, res) {
    let Name = req.body.Name;
    let SurName = req.body.SurName;
    let UserName = req.body.UserName;
    let Password = req.body.Password;
    let Email = req.body.Email;
    let PhoneNumber = req.body.PhoneNumber;
    let BankName = req.body.BankName;
    let AccountNumber = req.body.AccountNumber;
    let SecurityCode = req.body.SecurityCode;
    let Valid = "OK";//never used
    let Expiration = req.body.Expiration;
    Register(Name,SurName,UserName,Password,Email,PhoneNumber,BankName,AccountNumber,SecurityCode,Valid,Expiration,res);

  });*/


}