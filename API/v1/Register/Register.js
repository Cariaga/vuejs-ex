let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let RegisterModel = require("../Register/RegisterModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
module.exports = function (app) {

  app.get('/Api/v1/Register/Add/ScreenName/:ScreenName/UserName/:UserName/Password/:Password/Name/:Name/SurName/:SurName/Email/:Email/PhoneNumber/:PhoneNumber/BankName/:BankName/SecurityCode/:SecurityCode/AccountNumber/:AccountNumber/AccountHolder/:AccountHolder/ShopID/:ShopID/', function (req, res) {
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
    if (!isNullOrEmpty(ScreenName)) {
      if (!isNullOrEmpty(UserName)) {
        if (!isNullOrEmpty(Password)) {
          if (!isNullOrEmpty(Email)) {
            if (!isNullOrEmpty(PhoneNumber)) {
              if (!isNullOrEmpty(BankName)) {
                if (!isNullOrEmpty(AccountNumber)) {
                  if (!isNullOrEmpty(SecurityCode)) {
                    if (!isNullOrEmpty(AccountHolder)) {
                      if (!isNullOrEmpty(ShopID)) {

                        DBCheck.isUserNameExist(UserName, function (response) {
                          if (response == false) {
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
                          } else 
                          {
                            res.send({
                              UserNameExist: true
                            });
                          }
                        });

                      } else {
                        res.send({
                          InvalidShopID: true
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
      res.send({
        InvalidScreenName: true
      });
    }
  });



  function Register(Name,SurName,UserName,Password,Email,PhoneNumber,BankName,AccountNumber,SecurityCode,Valid,Expiration,res){
    
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
  app.get('/Api/v1/Register/Add/UserName/:UserName/Password/:Password/Name/:Name/SurName/:SurName/Email/:Email/PhoneNumber/:PhoneNumber/BankName/:BankName/SecurityCode/:SecurityCode/Expiration/:Expiration/AccountNumber/:AccountNumber/', function (req, res) {
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
    Register(Name,SurName,UserName,Password,Email,PhoneNumber,BankName,AccountNumber,SecurityCode,Valid,Expiration,res);

  });
  app.post('/Api/v1/Register/Add/', function (req, res) {
    let Name = req.body.Name;
    let SurName = req.body.SurName;
    let UserName = req.body.UserName;
    let Password = req.body.Password;
    let Email = req.body.Email;
    let PhoneNumber = req.body.PhoneNumber;
    let BankName = req.body.BankName;
    let AccountNumber = req.body.AccountNumber;
    let SecurityCode = req.body.SecurityCode;
    let Valid = req.body.Valid;
    let Expiration = req.body.Expiration;
    Register(Name,SurName,UserName,Password,Email,PhoneNumber,BankName,AccountNumber,SecurityCode,Valid,Expiration,res);

  });
}