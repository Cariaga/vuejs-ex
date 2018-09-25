let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let WithdrawHistoryModel = require("../WithdrawHistory/WithdrawHistoryModel");
var isNullOrEmpty = require('is-null-or-empty');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
let http = require('http');
module.exports = function (app) { //MODIFY
  app.get('/Api/v1/WithdrawHistory/Update/WithdrawHistoryID/:WithdrawHistoryID/UserAccountID/:UserAccountID/Status/', function (req, res) {
    let WithdrawHistoryID = req.params.WithdrawHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let ApprovedDATE = req.params.ApprovedDATE;
    let ApprovedTIME = req.params.ApprovedTIME;
    if (!isNullOrEmpty(WithdrawHistoryID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        let ApprovedDATEParsed = moment(ApprovedDATE, "YYYY-MM-DD");
        let isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();
        if (!isNullOrEmpty(ApprovedDATE) && isValidApprovedDATEParsed == true && ApprovedDATEParsed.year() > 1959) {
          if (!isNullOrEmpty(ApprovedTIME)) {

            WithdrawHistoryModel.WithdrawHistoryUpdateApproved(UserAccountID, WithdrawHistoryID, ApprovedDATE, ApprovedTIME, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  WithdrawHistoryUpdateApprovalFailed: true
                });
              }
            });

          } else {
            res.send({
              ApprovedTIMEMissing: true
            });
          }
        } else {
          res.send({
            ApprovedDATEMissing: true
          });
        }

      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        WithdrawHistoryIDMissing: true
      });
    }
  });



  app.get('/Api/v1/WithdrawHistory/Add/UserAccountID/:UserAccountID/UserName/:UserName/ContactNo/:ContactNo/BankName/:BankName/UserName/:UserName/UserName/:UserName/UserName/:UserName/UserName/:UserName/', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let UserName = req.params.UserName;
    let ContactNo = req.params.ContactNo;
    let BankName = req.params.BankName;
    let AccountNumber = req.params.AccountNumber;
    let ApplicationAmount = req.params.ApplicationAmount;
    let RemainingAmount = req.params.RemainingAmount;
    let ExistingAmount = req.params.ExistingAmount;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(UserName)) {
        if (!isNullOrEmpty(ContactNo)) {
          if (!isNullOrEmpty(BankName)) {
            if (!isNullOrEmpty(AccountNumber)) {
              if (!isNullOrEmpty(ApplicationAmount)) {
                if (!isNullOrEmpty(RemainingAmount)) {
                  if (!isNullOrEmpty(ExistingAmount)) {

                    WithdrawHistoryModel.AddWithdrawHistory(UserTransactionID, UserName, ContactNumber, BankName, AccountNumber, ApplicationAmount, ExistingAmount, RemainingAmount, function (response) {
                      if (response != undefined) {
                        res.send(response);
                      } else {
                        res.send({
                          AddWithdrawHistoryFailed: true
                        });
                      }
                    });
                  } else {
                    res.send({
                      ExistingAmountMissing: true
                    });
                  }
                } else {
                  res.send({
                    RemainingAmountMissing: true
                  });
                }
              } else {
                res.send({
                  ApplicationAmountMissing: true
                });
              }
            } else {
              res.send({
                AccountNumberMissing: true
              });
            }
          } else {
            res.send({
              BankNameMissing: true
            });
          }
        } else {
          res.send({
            ContactNoMissing: true
          });
        }
      } else {
        res.send({
          UserNameMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  //SELECTION
}