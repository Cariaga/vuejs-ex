var AccountVerificationModel = require('./AccountVerificationModel');
let DBCheck = require("../../SharedController/DBCheck");
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
/*currently unused */

module.exports = function (app) {
  /*this routes are used for verifying the account of a user account id with a valid key */
  //MODIFY
  app.get('/Api/v1/AccountVerification/Update/UserAccountID/:UserAccountID/Key/:Key', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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