var AccountVerificationModel = require('./AccountVerificationModel');
let DBCheck = require("../../SharedController/DBCheck");
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
  //MODIFY
  app.get('/Api/v1/AccountVerification/Update/UserAccountID/:UserAccountID/Key/:Key', Security.globalBruteforce.prevent, function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Key = req.params.Key;
    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
      if (response == true) {
        AccountVerificationModel.VerifyAccountUserAccountID(UserAccountID, function (response) {
          res.send(response);
        });
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    });
  });
}