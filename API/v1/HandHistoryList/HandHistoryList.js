
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {//SELECTION
  app.get('/Api/v1/HandHistory/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    HandHistory(function (response) {
      if (response != undefined) {
        res.send(beautify(response, null, 2, 100));
      } else {
        res.send([]);
      }
    });
  });
  app.get('/Api/v1/HandHistoryList/UserAccountID/:UserAccountID', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      let UserAccountIDExist = false;
      async.series([UserAccountIDCheck], function (error, response) {
        if (UserAccountIDExist == true) {
          HandHistoryUserAccountID(UserAccountID, function (response) {
            if (response != undefined) {
              res.send(beautify(response, null, 2, 100));
            } else {
              res.send({
                HandHistoryFailed: true
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
        isUserAccountIDExist(UserAccountID, function (response) {
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
    }
  });
  //INSERT
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
            let UserAccountIDExist = false;
            let UserInfoExist = false;
            let isEmailExist = false;
            async.series([UserAccountIDCheck, UserInfoCheck, UserInfoEmailExistCheck], function (error, response) {

              if (UserAccountIDExist == true) {
                if (UserInfoExist == false) { //must not exist already
                  if (isEmailExist == false) { //must Be False
                    AddUserInfo(UserAccountID, Email, PhoneNumber, TelephoneNumber, function (response) {
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
              isUserAccountIDExist(UserAccountID, function (response) {
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
              UserInfoUserAccountID(UserAccountID, function (response) {
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
              UserInfoEmailExist(Email, function (response) {
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
  //STRUCTURE
  app.get('/Api/v1/HandHistory/Clear', function (req, res) {
    Models.HandHistory.destroy({
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
}
