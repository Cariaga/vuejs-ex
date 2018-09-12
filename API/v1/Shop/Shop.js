let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let ShopModel = require("../Shop/ShopModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
module.exports = function (app) { //MODIFY
  app.get('/Api/v1/Shop/Update/:ShopID/:UserAccountID/:DistributorID/:Description/', function (req, res) {
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
  app.get('/Api/v1/Shop/Validate/:UserAccountID/', function (req, res) { //check for validation only
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
  app.get('/Api/v1/Shop/Add/UserAccountID/:UserAccountID/Name/:Name/PhoneNumber/:PhoneNumber/UserName/:UserName/Password/:Password/Commission/:Commission/DistributorID/:DistributorID/', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Name = req.params.Name;
    let PhoneNumber = req.params.PhoneNumber;
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let Commission = req.params.Commission;
    let DistributorID = req.params.DistributorID;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Name)) {
        if (!isNullOrEmpty(PhoneNumber)) {
          if (!isNullOrEmpty(UserName)) {
            if (!isNullOrEmpty(Password)) {
              if (!isNullOrEmpty(Commission)) {
                if (!isNullOrEmpty(DistributorID)) {
                  ShopModel.RegisterShop(UserAccountID,Name,PhoneNumber,UserName,Password,Commission,DistributorID, function (response) {
                    if (response != undefined) {
                      res.send(response);
                    } else {
                      res.send({
                        RegisterShopFailed: true
                      });
                    }
                  });
                } else {
                  res.send({
                    HeadOfficeIDMissing: true
                  });
                }
              } else {
                res.send({
                  CommissionMissing: true
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
        } else {
          res.send({
            PhoneNumberMissing: true
          });
        }
      } else {
        res.send({
          NameMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  app.get('/Api/v1/Shop/Add/:UserAccountID/:DistributorID/:Description/', function (req, res) {
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