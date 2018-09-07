
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {//SELECTION
  app.get('/Api/v1/HandHistory/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    HandHistoryModel.HandHistory(function (response) {
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
      
      HandHistoryModel.HandHistoryUserAccountID(UserAccountID, function (response) {
        if (response != undefined) {
          res.send(beautify(response, null, 2, 100));
        } else {
          res.send({
            HandHistoryFailed: true
          });
        }
      });

     /* let UserAccountIDExist = false;
      async.series([UserAccountIDCheck], function (error, response) {
        if (UserAccountIDExist == true) {
          HandHistoryModel.HandHistoryUserAccountID(UserAccountID, function (response) {
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
      }*/
    }
  });
  //INSERT
 
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
