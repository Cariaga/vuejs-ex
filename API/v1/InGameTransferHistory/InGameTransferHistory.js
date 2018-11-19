var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var isNullOrEmpty = require('is-null-or-empty');
let InGameTransferHistoryModel = require('./InGameTransferHistoryModel');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //selection
  app.get('/Api/v1/InGameTransferHistory/UserAccountID/:UserAccountID/', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 1  }), function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
      if (response == true) {
        InGameTransferHistoryModel.InGameTransferHistoryByUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }

        });
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    });
  });
}