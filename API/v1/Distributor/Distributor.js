let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let DistributorModel = require("../Distributor/DistributorModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //SELECTION
  app.get('/Api/v1/Distributor/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.Distributor.sync(); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      let result = Models.Distributor.findAll({
        where: {
          DistributorID: {
            ne: null //not null
          }
        }
      }).then(function (result) {
        let Data = result.map(function (item) {
          return item;

        });

        res.send(beautify(Data, null, 2, 100));
      }).catch(function (result) { //catching any then errors

        res.send("Error " + result);
      });
    }
    if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {

    }
    if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {

    }
    if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {

    }
    if (isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {

    }
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {

    }
    if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {

    }
    //res.send("Distributor "+Offset+" "+ Limit+" "+Sort);
  });
  app.get('/Api/v1/Distributor/Validate/:UserAccountID/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) { //check for validation only
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      DBCheck.isDistributorUserAccountIDExist(UserAccountID, function (response) {
        if (!isNullOrEmpty(response) && response.length > 0) {
          res.send({
            isDistributer: true
          });
        } else {
          res.send({
            isDistributer: false
          });
        }
      });
    } else {
      res.send("Missing params");
    }
  });
  //MODIFY
  app.get('/Api/v1/Distributor/Update/DistributorID/:DistributorID/UserAccountID/:UserAccountID/HeadOfficeID/:HeadOfficeID/Name/:Name/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let DistributorID = req.params.DistributorID;
    let UserAccountID = req.params.UserAccountID;
    let HeadOfficeID = req.params.HeadOfficeID;
    let Name = req.params.Name;
    if (!isNullOrEmpty(DistributorID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(HeadOfficeID)) {
          if (!isNullOrEmpty(Name)) {
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
              if (response == true) {
                DistributorModel.DistributorUpdate(UserAccountID, HeadOfficeID, Name, function (response) {
                  if (response != undefined) {
                    res.send(response);
                  } else {
                    res.send({
                      DistributorUpdateFailed: true
                    });
                  }
                });

              } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
              }
            });
          } else {
            res.send({
              NameFailed: true
            });
          }
        } else {
          res.send({
            HeadOfficeIDFailed: true
          });
        }
      } else {
        res.send({
          UserAccountIDFailed: true
        });
      }
    } else {
      res.send({
        DistributorIDFailed: true
      });
    }
  });
  //INSERT
  app.get('/Api/v1/Distributor/Add/:UserAccountID/:HeadOfficeID/:Name/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    //Usage /Api/v1/Distributor/Add/UserAccountID/HeadOfficeID/Name/
    let UserAccountID = req.params.UserAccountID;
    let HeadOfficeID = req.params.HeadOfficeID;
    let Name = req.params.Name;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(HeadOfficeID)) {
        if (!isNullOrEmpty(Name)) {
          DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
              DistributorModel.AddDistributor(UserAccountID, HeadOfficeID, Name, function (response) {
                if (response != undefined) {
                  res.send(response);
                } else {
                  res.send({
                    AddDistributorFailed: true
                  });
                }
              });
            } else {
              let status = 404;
              res.status(status).end(http.STATUS_CODES[status]);
            }
          });
        } else {
          res.send({
            NameMissing: true
          });
        }
      } else {
        res.send({
          HeadOfficeIDMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });

  app.get('/Api/v1/Shop/DistributorID/:DistributorID/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let DistributorID = req.params.DistributorID;
    if (!isNullOrEmpty(DistributorID)) {
      DistributorModel.ChildShopsFromDistributorID(DistributorID, function (response) {
        if (response != undefined) {
          res.send(beautify(response, null, 2, 100));
        } else {
          res.send([]);
        }
      });
    } else {
      res.send({
        DistributorIDMissing: true
      });
    }
  });

  app.get('/Api/v1/Distributor/Add/UserAccountID/:UserAccountID/Name/:Name/PhoneNumber/:PhoneNumber/UserName/:UserName/Password/:Password/Commission/:Commission/HeadOfficeUserAccountID/:HeadOfficeUserAccountID', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Name = req.params.Name;
    let PhoneNumber = req.params.PhoneNumber;
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let Commission = req.params.Commission;
    let HeadOfficeUserAccountID = req.params.HeadOfficeUserAccountID;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Name)) {
        if (!isNullOrEmpty(PhoneNumber)) {
          if (!isNullOrEmpty(UserName)) {
            if (!isNullOrEmpty(Password)) {
              if (!isNullOrEmpty(Commission)) {
                if (!isNullOrEmpty(HeadOfficeUserAccountID)) {
                  DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                    if (response == false) {
                      DistributorModel.IDOfHeadOffice(HeadOfficeUserAccountID,function(response){
                        if(response!=undefined){
                          let HeadOfficeID = response[0].HeadOfficeID;
                          DistributorModel.RegisterDistributor(UserAccountID, Name, PhoneNumber, UserName, Password, Commission, HeadOfficeID, function (response) {
                            if (response != undefined) {
                              res.send(response);
                            } else {
                              res.send({
                                RegisterDistributorFailed: true
                              });
                            }
                          });
                        }else{
                          res.send({HeadOfficeUserAccountIDNotFound:true});
                        }
                      });
                    } else {
                      let status = 404;
                      res.status(status).end(http.STATUS_CODES[status]);
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
}