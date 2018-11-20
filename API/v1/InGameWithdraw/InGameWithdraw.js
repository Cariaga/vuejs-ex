let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameWithdrawModel = require("./InGameWithdrawModel");
var isNullOrEmpty = require('is-null-or-empty');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card

module.exports = function (app) {
  app.get('/Api/v1/WithdrawHistory/Request/UserAccountID/:UserAccountID/Amount/:Amount/Bank/:Bank/AccountNumber/:AccountNumber/Name/:Name/WithdrawPassword/:WithdrawPassword/ContactNumber/:ContactNumber/', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 1  }), function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Amount = parseInt(req.params.Amount);
    let Bank = req.params.Bank;
    let AccountNumber = req.params.AccountNumber;
    let Name = req.params.Name;
    let WithdrawPassword = req.params.WithdrawPassword;
    let ContactNumber = req.params.ContactNumber;
    Request(UserAccountID,Amount,Bank,AccountNumber,Name,WithdrawPassword,ContactNumber,res);
  });

  app.post('/Api/v1/WithdrawHistory/Request/', Security.rateLimiterMiddleware,Security.verifyToken,/*Security.cache.route({ expire: 1  }), */function (req, res) {
    let UserAccountID = req.body.UserAccountID;
    let Amount = parseInt(req.body.Amount);
    let Bank = req.body.Bank;
    let AccountNumber = req.body.AccountNumber;
    let Name = req.body.Name;
    let WithdrawPassword = req.body.WithdrawPassword;
    let ContactNumber = req.body.ContactNumber;
    Request(UserAccountID,Amount,Bank,AccountNumber,Name,WithdrawPassword,ContactNumber,res);
  });

  function Request(UserAccountID,Amount,Bank,AccountNumber,Name,WithdrawPassword,ContactNumber,res){
    if(!isNullOrEmpty(UserAccountID)){

      if(!isNullOrEmpty(Amount)&&Amount>=1){
        if(!isNullOrEmpty(Bank)){
          if(!isNullOrEmpty(AccountNumber)){
            if(!isNullOrEmpty(WithdrawPassword)){
              if(!isNullOrEmpty(ContactNumber)){
                DBCheck.isValidSubractPlayerAmount(UserAccountID,Amount,function(response){
                  if(response==true){
                    DBCheck.CheckWithdrawPassword(UserAccountID,WithdrawPassword,function(response){
                      if(response==true){
                        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                          if (response == true) {
                            InGameWithdrawModel.RequestWithdraw(UserAccountID, Amount, Bank, AccountNumber, Name, WithdrawPassword, ContactNumber, function (response) {
                              if(response!=undefined){
                                let status = 200;
                                res.status(status).end(http.STATUS_CODES[status]);
                              }else{
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                              }
                            })
                          } else {
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                          }
                        });
                      }else{
                        res.send({InvalidWithdrawPassword:true});
                      }
                    });
                  }else{
                    res.send({NotEnoughMoney:true});
                  }

                });
  

              }else{
                res.send({InvalidContactNumber:true});
              }
            }else{
              res.send({InvalidWithdrawPassword:true});
            }
          }else{
            res.send({InvalidAccountNumber:true});
          }
        }else{
          res.send({InvalidBank:true});
        }
      }else{
        res.send({InvalidAmount:true});
      }
    }else{
      res.send({InvalidUserAccountID:true});
    }
  }
}
