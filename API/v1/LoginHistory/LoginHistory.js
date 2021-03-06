let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let LoginHistoryModel = require("../LoginHistory/LoginHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { //MODIFT
  //deprected
 /* app.get('/Api/v1/LoginHistory/Update/:LoginHistoryID/:UserAccountID/:IP/:DeviceName/:DeviceRam/:DeviceCpu/:Time/:Date', function (req, res) {
    let LoginHistoryID = req.params.LoginHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let IP = req.params.IP;
    let DeviceName = req.params.DeviceName;
    let DeviceRam = req.params.DeviceRam;
    let DeviceCpu = req.params.DeviceCpu;
    let Time = req.params.Time;
    let Date = req.params.Date;

    if (!isNullOrEmpty(LoginHistoryID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(IP)) {
          if (!isNullOrEmpty(DeviceName)) {
            if (!isNullOrEmpty(DeviceRam)) {
              if (!isNullOrEmpty(DeviceCpu)) {
                if (!isNullOrEmpty(Time)) {
                  if (!isNullOrEmpty(Date)) {
                    LoginHistoryModel.LoginHistoryUpdate(LoginHistoryID, UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, Time, Date, function (response) {
                      if (response != undefined) {
                        res.send(response);
                      } else {
                        res.send({
                          LoginHistoryUpdateFailed: true
                        });
                      }
                    });
                  } else {
                    res.send({
                      DateMissing: true
                    });
                  }
                } else {
                  res.send({
                    TimeMissing: true
                  });
                }
              } else {
                res.send({
                  DeviceCpuMissing: true
                });
              }
            } else {
              res.send({
                DeviceRamMissing: true
              });
            }
          } else {
            res.send({
              DeviceNameMissing: true
            });
          }
        } else {
          res.send({
            IPMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        LoginHistoryIDMissing: true
      });
    }
  });*/
  //INSERT
  //deprecate
  /*app.get('/Api/v1/LoginHistory/Add/:UserAccountID/:IP/:DeviceName/:DeviceRam/:DeviceCpu/:Time/:Date', function (req, res) {
    //USAGE /Api/v1/LoginHistory/Add/UserAccountID/IP/DeviceName/DeviceRam/DeviceCpu/01:57:17/2018-06-27
    let UserAccountID = req.params.UserAccountID;
    let IP = req.params.IP;
    let DeviceName = req.params.DeviceName;
    let DeviceRam = req.params.DeviceRam;
    let DeviceCpu = req.params.DeviceCpu;
    let Time = req.params.Time;
    let Date = req.params.Date;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(IP)) {
        if (!isNullOrEmpty(DeviceName)) {
          if (!isNullOrEmpty(DeviceRam)) {
            if (!isNullOrEmpty(DeviceCpu)) {
              if (!isNullOrEmpty(Time)) {
                if (!isNullOrEmpty(Date)) {
                  DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                    if (response == true) {
                      LoginHistoryModel.AddLoginHistory(UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, Time, Date, function (response) {
                        if (response != undefined) {
                          res.send(response);
                        } else {
                          res.send({
                            AddLoginHistoryFailed: true
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
                    DateMissing: true
                  });
                }
              } else {
                res.send({
                  TimeMissing: true
                });
              }
            } else {
              res.send({
                DeviceCpuMissing: true
              });
            }
          } else {
            res.send({
              DeviceRamMissing: true
            });
          }
        } else {
          res.send({
            DeviceNameMissing: true
          });
        }
      } else {
        res.send({
          IPMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });*/
  //SELECTION
  app.get('/Api/v1/LoginHistory/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.LoginHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      Models.LoginHistory.sync();
      let result = Models.LoginHistory.findAll({
        where: {
          LoginHistoryID: {
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
    //getting specific login history of a user account ID
    app.get('/Api/v1/LoginHistory/UserAccountID/:UserAccountID', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      let UserAccountID = req.params.UserAccountID;
      DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
        if (response == true) {
          LoginHistoryModel.LoginHistoryUserAccountID(UserAccountID, function (response) {
            if (response != undefined) {
              res.send(beautify(response, null, 2, 100));
            } else {
              res.send({
                LoginHistoryUserAccountIDFound: false
              });
            }
          });
        } else {
          let status = 404;
          res.status(status).end(http.STATUS_CODES[status]);
        }
      });
    });
    //res.send("LoginHistory "+Offset+" "+ Limit+" "+Sort);
  });
  app.get('/Api/v1/LoginHistory/Latest/UserAccountID/:UserAccountID/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
      if (response == true) {
        LoginHistoryUserAccountIDLatest(UserAccountID, function (response) {
          if (response != undefined) {
            res.send(beautify(response, null, 2, 100));
          } else {
            res.send({
              LoginHistoryUserAccountIDFound: false
            });
          }
        });
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    });
  });
  app.get('/Api/v1/LoginHistory/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.LoginHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      Models.LoginHistory.sync();
      let result = Models.LoginHistory.findAll({
        where: {
          LoginHistoryID: {
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
    //res.send("LoginHistory "+Offset+" "+ Limit+" "+Sort);
  });
  //STRUCTURE
  app.get('/Api/v1/LoginHistory/Clear', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    Models.LoginHistory.destroy({
        where: {},
        truncate: true
      })
      .then(Success => {
        res.send("Cleared");
      })
      .catch(err => {
        res.send("Truncate " + err);
      });
  });
  app.get('/Api/v1/LoginHistory/Delete', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    Models.LoginHistory.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors

      res.send("Error " + result);
    });
  });
  app.get('/Api/v1/LoginHistory/Describe', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.LoginHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.LoginHistory.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}