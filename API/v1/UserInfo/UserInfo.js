let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let UserInfoModel = require("../UserInfo/UserInfoModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //MODIFY
  app.get('/Api/v1/UserInfo/Update/UserAccountID/:UserAccountID/Email/:Email/', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Email = req.params.Email;
    let UserAccountIDExist = false;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Email)) {
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
          if (response == true) {
            async.series([UserAccountCheck], function (error, response) {
              if (UserAccountIDExist == true) {
                UserInfoModel.UserInfoUpdateEmail(UserAccountID, Email, function (response) {
                  if (response != undefined) {
                    res.send(response);
                  } else {
                    res.send({
                      UserAccountIDUpdateEmailFailed: true
                    });
                  }
                });
              } else {
                res.send({
                  UserAccountIDExist: false
                });
              }
            });

            function UserAccountCheck(callback) {
              DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                if (response != undefined) {
                  UserAccountIDExist = true;
                  callback(null, '1');
                } else {
                  UserAccountIDExist = false;
                  callback(null, '1');
                }
              });
            }
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      } else {
        res.send({
          EmailMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  app.get('/Api/v1/UserInfo/Update/UserAccountID/:UserAccountID/Email/:Email/PhoneNumber/:PhoneNumber/TelephoneNumber/:TelephoneNumber', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Email = req.params.Email;
    let PhoneNumber = req.params.PhoneNumber;
    let TelephoneNumber = req.params.TelephoneNumber;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Email)) {
        if (!isNullOrEmpty(PhoneNumber)) {
          if (!isNullOrEmpty(TelephoneNumber)) {
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
              if (response == true) {
                let UserAccountIDExist = false;
                async.series([UserAccountIDCheck], function (error, response) {
                  if (UserAccountIDExist == true) {
                    UserInfoModel.UserInfoUpdate(UserAccountID, Email, PhoneNumber, TelephoneNumber, function (response) {
                      if (!isNullOrEmpty(response) && response != undefined) {
                        res.send(response);
                      } else {
                        res.send({
                          UserInfoUpdateFailed: true
                        });
                      }
                    });
                  } else {
                    res.send({
                      UserAccountIDExist: false
                    });
                  }
                });

                function UserAccountIDCheck(callback) {
                  DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                    let obj = response;
                    if (!isNullOrEmpty(obj) && obj != undefined && obj[0].UserAccountID == UserAccountID) {
                      UserAccountIDExist = true;
                      callback(null, '1');
                    } else {
                      UserAccountIDExist = false;
                      callback(null, '1');
                    }
                  });
                }
              } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
              }
            });
          } else {
            res.send({
              TelephoneNumberExist: false
            });
          }
        } else {
          res.send({
            PhoneNumberExist: false
          });
        }
      } else {
        res.send({
          EmailExist: false
        });
      }
    } else {
      res.send({
        UserAccountIDExist: false
      });
    }
  });
  //Insert
  app.get('/Api/v1/UserInfo/Add/UserAccountID/:UserAccountID/Email/:Email/PhoneNumber/:PhoneNumber/TelephoneNumber/:TelephoneNumber/', function (req, res) {
    //USAGE /Api/v1/UserInfo/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Email/Cariagajkl.info@gmail.com/PhoneNumber/02121547894/TelephoneNumber/1324579/

    //Tests for foreignKey should result in  foreign key constraint fails Error
    // /Api/v1/UserInfo/Add/5879999/Email14535432/PhoneNumber/TelephoneNumber

    let UserAccountID = req.params.UserAccountID;
    let Email = req.params.Email;
    let PhoneNumber = req.params.PhoneNumber;
    let TelephoneNumber = req.params.TelephoneNumber;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Email)) {
        if (!isNullOrEmpty(PhoneNumber)) {
          if (!isNullOrEmpty(TelephoneNumber)) {
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
              if (response == true) {
                let UserAccountIDExist = false;
                let UserInfoExist = false;
                let isEmailExist = false;
                async.series([UserAccountIDCheck, UserInfoCheck, UserInfoEmailExistCheck], function (error, response) {

                  if (UserAccountIDExist == true) {
                    if (UserInfoExist == false) { //must not exist already
                      if (isEmailExist == false) { //must Be False
                        UserInfoModel.AddUserInfo(UserAccountID, Email, PhoneNumber, TelephoneNumber, function (response) {
                          if (response != undefined) {
                            res.send(response);
                          } else {
                            res.send({
                              AddUserInfoFailed: true
                            });
                          }
                        });
                      } else {
                        res.send({
                          UserInfoExist: true
                        });
                      }

                    } else {
                      res.send({
                        UserInfoExist: true
                      });
                    }
                  } else {
                    res.send({
                      UserAccountIDExist: true
                    });
                  }
                });

                function UserAccountIDCheck(callback) {
                  DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                    let obj = response;
                    if (!isNullOrEmpty(obj) && obj != undefined && obj[0].UserAccountID == UserAccountID) {
                      UserAccountIDExist = true;
                      callback(null, '1');
                    } else {
                      UserAccountIDExist = false;
                      callback(null, '1');
                    }
                  });
                }

                function UserInfoCheck(callback) {
                  DBCheck.UserInfoUserAccountID(UserAccountID, function (response) {
                    if (response != undefined) {
                      UserInfoExist = true;
                      callback(null, '3');
                    } else {
                      UserInfoExist = false;
                      callback(null, '3');
                    }
                  });
                }

                function UserInfoEmailExistCheck(callback) {
                  DBCheck.UserInfoEmailExist(Email, function (response) {
                    let obj = response;
                    if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].Email == Email) {
                      isEmailExist = true;
                      callback(null, 2);

                    } else {
                      isEmailExist = false;
                      callback(null, 2);
                    }
                  });
                }
              } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
              }
            });
          } else {
            res.send({
              TelephoneNumberMissing: true
            });
          }
        } else {
          res.send({
            PhoneNumberMissing: true
          });
        }
      } else {
        res.send({
          EmailMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  //SELECTION
  app.get('/Api/v1/UserInfo/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.UserInfo.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      Models.UserInfo.sync();
      let result = Models.UserInfo.findAll({
        where: {
          UserInfoID: {
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
    if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {}
    if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {}
    if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {}
    if (isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {}
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {}
    if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {}
  });
  //STRUCTURE
  app.get('/Api/v1/UserInfo/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.UserInfo.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.UserInfo.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}