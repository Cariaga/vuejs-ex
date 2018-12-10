let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let HeadOfficeModel = require("../HeadOffice/HeadOfficeModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var uuidv4 = require('uuid/v4');

module.exports = function (app) { //INSERT
  app.get('/Api/v1/UserNameCheck/:UserName', function(req, res){
    let UserName = req.params.UserName;
    if (!isNullOrEmpty(UserName)) {
      DBCheck.isUserNameExist(UserName,function(response){
        if(response==false){
          res.send(response);
        }else{
          // username already exist
          res.send({ UserNameAlreadyExist:true});
          // res.send(response);
          // let status = 404;
          // res.status(status).end(http.STATUS_CODES[status]);
        }
      });

    }else{
      res.send({UserNameMissing:true});
    }

  });

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
  // Security.verifyToken, Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),
  app.get('/Api/v1/HeadOffice/Add/Name/:Name/PhoneNumber/:PhoneNumber/UserName/:UserName/Password/:Password/Commission/:Commission/OperatingHeadOfficeUserAccountID/:OperatingHeadOfficeUserAccountID', function (req, res) {
    let UserAccountID = uuidv4();
    let Name = req.params.Name;
    let PhoneNumber = req.params.PhoneNumber;
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let Commission = req.params.Commission;
    let OperatingHeadOfficeUserAccountID = req.params.OperatingHeadOfficeUserAccountID;
      AddHeadOffice(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, OperatingHeadOfficeUserAccountID, res);
  });
  app.post('/Api/v1/HeadOffice/Add', /*Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),*/ function (req, res) {
    let UserAccountID = uuidv4();
    let Name = req.body.Name;
    let PhoneNumber = req.body.PhoneNumber;
    let UserName = req.body.UserName;
    let Password = req.body.Password;
    let Commission = req.body.Commission;
    let OperatingHeadOfficeUserAccountID = req.body.OperatingHeadOfficeUserAccountID;
      AddHeadOffice(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, OperatingHeadOfficeUserAccountID, res);
  });
  //STRUCTURE
  //SELECTION
}

function AddHeadOffice(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, OperatingHeadOfficeUserAccountID, res) {
  if (!isNullOrEmpty(UserAccountID)) {
    if (!isNullOrEmpty(Name)) {
      if (!isNullOrEmpty(PhoneNumber)) {
        if (!isNullOrEmpty(UserName)) {
          if (!isNullOrEmpty(Password)) {
            if (!isNullOrEmpty(Commission)) {
              DBCheck.isUserNameExist(UserName,function(response){
                if(response==false){
              DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                if (response == false) {
                  HeadOfficeModel.IDOperatingHeadOffice(OperatingHeadOfficeUserAccountID, function (response) {
                    if (response != undefined) {
                      // res.send(response[0].UserAccountID);
                      let OperatingHeadOfficeID = response[0].OperatingHeadOfficeID; //don't res.send it will think its a status code but its actually an ID
                        HeadOfficeModel.RegisterHeadOffice(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, OperatingHeadOfficeID, function (response) {
                          if(response!=undefined){
                            let status = 200;
                            res.status(status).end(http.STATUS_CODES[status]);
                            console.log('addheadoffice response' + JSON.stringify(response))
                          }else{
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                            console.log('addheadoffice response' + JSON.stringify(response))
                          }
                        });
                    }
                    else {
                      res.send({ OperatingHeadOfficeUserAccountIDNotFound: true });
                    }
                  });
                }
                else {
                  res.send({
                    UserAccountIDExist: true
                  });
                }
              });
                }else{
                  res.send({UserNameAlreadyExist:true});
                }
              });

            }
            else {
              res.send({
                UserAccountIDMissing: true
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
            PhoneNumberMissing: true
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
        PasswordMissing: true
      });
    }
  }
  else {
    res.send({
      CommissionMissing: true
    });
  }
}
