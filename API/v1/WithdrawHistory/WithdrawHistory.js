let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let WithdrawHistoryModel = require("../WithdrawHistory/WithdrawHistoryModel");
var isNullOrEmpty = require('is-null-or-empty');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
module.exports = function (app) {//MODIFY
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
  app.get('/Api/v1/WithdrawHistory/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.WithdrawHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      Models.WithdrawHistory.sync();
      let result = Models.WithdrawHistory.findAll({
        where: {
          WithdrawHistoryID: {
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
    //res.send("WithdrawHistory "+Offset+" "+ Limit+" "+Sort);
  });
  
  app.get('/Api/v1/WithdrawHistory/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.WithdrawHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.WithdrawHistory.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
  app.get('/Api/v1/UserInfo/Clear', function (req, res) {
    Models.UserInfo.destroy({
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
  app.get('/Api/v1/UserInfo/Delete', function (req, res) {
    Models.UserInfo.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors
  
      res.send("Error " + result);
    });
  });
  app.get('/Api/v1/WithdrawHistory/Clear', function (req, res) {
    Models.WithdrawHistory.destroy({
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
  app.get('/Api/v1/WithdrawHistory/Delete', function (req, res) {
    Models.WithdrawHistory.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors
  
      res.send("Error " + result);
    });
  });
}
