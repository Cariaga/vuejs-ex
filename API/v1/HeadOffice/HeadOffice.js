let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let HeadOfficeModel = require("../HeadOffice/HeadOfficeModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //INSERT
  app.get('/Api/v1/HeadOffice/Add/:UserAccountID/:Name/:Description/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    //Usage Api/v1/HeadOffice/Add/UserAccountID/Name/Description/
    let UserAccountID = req.params.UserAccountID;
    let Name = req.params.Name;
    let Description = req.params.Description;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Name)) {
        if (!isNullOrEmpty(Description)) {
          HeadOfficeModel.AddHeadOffice(UserAccountID, Name, Description, function (response) {
            if (response != undefined) {
              res.send(response);
            } else {
              res.send({
                AddHeadOfficeFailed: true
              });
            }
          });
        } else {
          res.send({
            DescriptionMissing: true
          })
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
  app.get('/Api/v1/HeadOffice/Validate/:UserAccountID/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) { //check for validation only
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      DBCheck.isHeadOfficeUserAccountIDExist(UserAccountID, function (response) {
        if (!isNullOrEmpty(response) && response.length > 0) {
          res.send({
            isHeadOffice: true
          });
        } else {
          res.send({
            isHeadOffice: false
          });
        }
      });
    } else {
      res.send("Missing params");
    }
  });
  app.get('/Api/v1/HeadOffice/Add/UserAccountID/:UserAccountID/Name/:Name/PhoneNumber/:PhoneNumber/UserName/:UserName/Password/:Password/Commission/:Commission/OperatingHeadOfficeUserAccoundID/:OperatingHeadOfficeUserAccoundID', /*Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),*/ function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Name = req.params.Name;
    let PhoneNumber = req.params.PhoneNumber;
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let Commission = req.params.Commission;
    let OperatingHeadOfficeUserAccoundID = OperatingHeadOfficeUserAccoundID;
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(Name)) {
          if (!isNullOrEmpty(PhoneNumber)) {
            if (!isNullOrEmpty(UserName)) {
              if (!isNullOrEmpty(Password)) {
                if (!isNullOrEmpty(Commission)) {
                  DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                    if (response[0].UserAccountID != UserAccountID) {
                    HeadOfficeModel.IDOperatingHeadOffice(UserAccountID,function(response){
                      if(response!=undefined){
                        let OperatingHeadOfficeID = response[0].OperatingHeadOfficeID;
                        HeadOfficeModel.RegisterHeadOffice(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, function (response) {
                          res.send(response);
                        });
                      }else{
                        res.send({OperatingHeadOfficeUserAccountIDNotFound:true});
                      }
                    });
                    }else{
                      res.send({
                        UserAccountIDExist: true
                      })
                    }
                  });
                } else {
                  res.send({
                    UserAccountIDMissing: true
                  })
                }
              } else {
                res.send({
                  NameMissing: true
                })
              }
            } else {
              res.send({
                PhoneNumberMissing: true
              })
            }
          } else {
            res.send({
              UserNameMissing: true
            })
          }
        } else {
          res.send({
            PasswordMissing: true
          })
        }
      } else {
        res.send({
          CommissionMissing: true
        })
      }
  });
  
  //STRUCTURE
  //SELECTION
}