let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let ShopModel = require("../Shop/ShopModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //MODIFY
  app.get('/Api/v1/Shop/Update/:ShopID/:UserAccountID/:DistributorID/:Description/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let ShopID = req.params.ShopID;
    let UserAccountID = req.params.UserAccountID;
    let DistributorID = req.params.DistributorID;
    let Description = req.params.Description;
    if (!isNullOrEmpty(ShopID) &&
      !isNullOrEmpty(UserAccountID) &&
      !isNullOrEmpty(DistributorID) &&
      !isNullOrEmpty(Description)) {
      Models.Shop.update({
          UserAccountID: UserAccountID,
          DistributorID: DistributorID,
          Description: Description
        }, {
          where: {
            ShopID: ShopID
          }
        })
        .then(Success => {
          res.send("Updated");
        })

        .catch(error => {
          // mhhh, wth!
          console.log("Error Updating");
          res.send("Error Updating " + error);
        });
    }
  });
  app.get('/Api/v1/Shop/Validate/:UserAccountID/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) { //check for validation only
    //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      DBCheck.isShopUserAccountIDExist(UserAccountID, function (response) {
        if (!isNullOrEmpty(response) && response.length > 0) {
          res.send({
            isShop: true
          });
        } else {
          res.send({
            isShop: false
          });
        }

      });
    } else {
      res.send("Missing params");
    }
  });
  //INSERT

  //useraccount being created must not exist already
  //but the Upper level should exist
  app.get('/Api/v1/Shop/Add/Name/:Name/PhoneNumber/:PhoneNumber/UserName/:UserName/Password/:Password/Commission/:Commission/DistributorUserAccountID/:DistributorUserAccountID/',/* Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),*/ function (req, res) {

    let UserAccountID = uuidv4();
    let Name = req.params.Name;
    let PhoneNumber = req.params.PhoneNumber;
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let Commission = req.params.Commission;
    let DistributorUserAccountID = req.params.DistributorUserAccountID;
    AddShop(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, DistributorUserAccountID, res);
  });
  app.post('/Api/v1/Shop/Add/',/* Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),*/ function (req, res) {

    let UserAccountID = req.body.UserAccountID;
    let Name = req.body.Name;
    let PhoneNumber = req.body.PhoneNumber;
    let UserName = req.body.UserName;
    let Password = req.body.Password;
    let Commission = req.body.Commission;
    let DistributorUserAccountID = req.body.DistributorUserAccountID;
    AddShop(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, DistributorUserAccountID, res);
  });
  
  app.get('/Api/v1/Shop/Add/:UserAccountID/:DistributorID/:Description/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
    let UserAccountID = req.params.UserAccountID;
    let DistributorID = req.params.DistributorID;
    let Description = req.params.Description;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(DistributorID)) {
        if (!isNullOrEmpty(Description)) {
          ShopModel.AddShop(UserAccountID, DistributorID, Description, function (response) {
            if (response != undefined) {
              res.send(response);
            } else {
              res.send({
                AddShopFailed: true
              });
            }
          });
        } else {
          res.send({
            DescriptionMissing: true
          });
        }
      } else {
        res.send({
          DistributorIDMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
}

function AddShop(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, DistributorUserAccountID, res) {
  if (!isNullOrEmpty(UserAccountID)) {
    if (!isNullOrEmpty(Name)) {
      if (!isNullOrEmpty(PhoneNumber)) {
        if (!isNullOrEmpty(UserName)) {
          if (!isNullOrEmpty(Password)) {
            if (!isNullOrEmpty(Commission)) {
              if (!isNullOrEmpty(DistributorUserAccountID)) {
                DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                  if (response == false) {
                    ShopModel.IDOfDistributor(DistributorUserAccountID, function (response) {
                      if (response != undefined) {
                        var DistributorID = response[0].DistributorID;
                        ShopModel.RegisterShop(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, DistributorID, function (response) {
                          if (response != undefined) {
                            res.send(response);
                          }
                          else {
                            res.send({
                              RegisterShopFailed: true
                            });
                          }
                        });
                      }
                      else {
                        res.send({ DistributorUserAccountIDNotFound: true });
                      }
                    });
                  }
                  else {
                    res.send({ ShopUserAccountIDAlreadyExist: true });
                  }
                });
              }
              else {
                res.send({
                  HeadOfficeIDMissing: true
                });
              }
            }
            else {
              res.send({
                CommissionMissing: true
              });
            }
          }
          else {
            res.send({
              PasswordMissing: true
            });
          }
        }
        else {
          res.send({
            UserNameMissing: true
          });
        }
      }
      else {
        res.send({
          PhoneNumberMissing: true
        });
      }
    }
    else {
      res.send({
        NameMissing: true
      });
    }
  }
  else {
    res.send({
      UserAccountIDMissing: true
    });
  }
}
