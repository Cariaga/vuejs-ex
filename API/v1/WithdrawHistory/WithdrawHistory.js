let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let WithdrawHistoryModel = require("../WithdrawHistory/WithdrawHistoryModel");
var isNullOrEmpty = require('is-null-or-empty');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
var async = require("async");
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { //MODIFY
  /*updating of user account Withdraw History as approved */
  app.get('/Api/v1/WithdrawHistory/Update/Status/Approved/WithdrawHistoryID/:WithdrawHistoryID/UserAccountID/:UserAccountID/', /*Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),*/ function (req, res) {
    let WithdrawHistoryID = req.params.WithdrawHistoryID;
    let UserAccountID = req.params.UserAccountID;
    if(!isNullOrEmpty(UserAccountID)){
      if (!isNullOrEmpty(WithdrawHistoryID)) {
        WithdrawHistoryModel.isAlreadyApproved(WithdrawHistoryID,UserAccountID,function(response){
          if(response==false){
            WithdrawHistoryModel.isValidWithdraw(WithdrawHistoryID,UserAccountID,function(response){
              if(response==true){
                WithdrawHistoryModel.WithdrawHistoryUpdateApproved(WithdrawHistoryID,UserAccountID, function (response) {
                  if (response != undefined) {
                    var status = 200;
                    res.status(status).end(http.STATUS_CODES[status]);
                  } else {
                    res.send({
                      WithdrawHistoryUpdateApprovalFailed: true
                    });
                  }
                });
              }else{
                res.send({
                  InvalidUserAccountIDORWithdrawHistoryID: true
                });
              }
            });
          }else{
            res.send({
              isAlreadyApproved: true
            });
          }


        });
 



      } else {
        res.send({
          WithdrawHistoryIDMissing: true
        });
      }
    }else{
      res.send({
        UserAccountIDMissing: true
      });
    }

  });

  
  app.get('/Api/v1/WithdrawHistory/Add/UserAccountID/:UserAccountID/UserName/:UserName/ContactNo/:ContactNo/BankName/:BankName/AccountNumber/:AccountNumber/ApplicationAmount/:ApplicationAmount/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let UserName = req.params.UserName;
    let ContactNo = req.params.ContactNo;
    let BankName = req.params.BankName;
    let AccountNumber = req.params.AccountNumber;
    let ApplicationAmount = req.params.ApplicationAmount;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(UserName)) {
        if (!isNullOrEmpty(ContactNo)) {
          if (!isNullOrEmpty(BankName)) {
            if (!isNullOrEmpty(AccountNumber)) {
              if (!isNullOrEmpty(ApplicationAmount)) {
                DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                  if (response == true) {
                    async.series([IsUserAccountIDExistCheck], function (error, response) {
                      if (isUserAccountIDFound == true) {

                        let UserTransactionID = uuidv4();

                        WithdrawHistoryModel.AddWithdrawHistory(UserTransactionID, UserAccountID, UserName, ContactNo, BankName, AccountNumber, ApplicationAmount, function (response) {
                          if (response) {
                            var status = 200;
                            res.status(status).end(http.STATUS_CODES[status]);
                          } else {
                            res.send({
                              AddDepositFailed: true
                            });
                          }
                        });


                      } else {
                        res.send({
                          IsUserAccountIDExist: false
                        });
                      }
                    });

                    function IsUserAccountIDExistCheck(callback) {
                      DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                        if (response != undefined) {
                          isUserAccountIDFound = true;
                          callback(null, '1');
                        } else {
                          isUserAccountIDFound = false;
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