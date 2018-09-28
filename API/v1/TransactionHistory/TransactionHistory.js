let TransactionHistoryModel = require("../TransactionHistory/TransactionHistoryModel");
var isNullOrEmpty = require('is-null-or-empty');
let DBCheck = require("../../SharedController/DBCheck");
var beautify = require("json-beautify");

module.exports = function (app) {
  app.get('/Api/v1/TransactionHistory/UserTransactionID/:UserTransactionID/TransactionStatus/:TransactionStatus/', function (req, res) {
    let UserTransactionID = req.params.UserTransactionID;
    let TransactionStatus = req.params.TransactionStatus;

    if (!isNullOrEmpty(UserTransactionID)) {
      if (!isNullOrEmpty(TransactionStatus)) {
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
          if (response == true) {
            TransactionHistoryModel.UpdateTransactionStatus(UserTransactionID, TransactionStatus, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  UpdateTransactionStatusFailed: true
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
          TransactionStatusMissing: true
        });
      }
    } else {
      res.send({
        UserTransactionIDIDMissing: true
      });
    }
  });
}