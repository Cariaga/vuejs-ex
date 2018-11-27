let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let SubUserAccountModel = require("../SubUserAccount/SubUserAccountModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');

var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //SELECTION
    app.get('/Api/v1/SubAccounts/Add/', function (req, res) {
       res.send("asg");
    });
    app.get('/Api/v1/SubAccounts/Add/UserName/:UserName/Password/:Password/AccessID/:AccessID/MainUserAccountID/:MainUserAccountID/', function (req, res) {
        let UserName = req.params.UserName;
        let Password = req.params.Password;
        let AccessID = req.params.AccessID;
        let MainUserAccountID = req.params.MainUserAccountID;

        if (!isNullOrEmpty(UserName)) {

    
            if (!isNullOrEmpty(Password)) {
    
              if (!isNullOrEmpty(MainUserAccountID)) {
                    DBCheck.isUserAccountIDExist(MainUserAccountID,function(response){
                        if(response==true){
                            SubUserAccountModel.AddSubAccount(UserName,Password,AccessID,MainUserAccountID,function(response){
                                if(response!=undefined){
                                    let status = 200;
                                    res.status(status).end(http.STATUS_CODES[status]);
                                }else{
                                    let status = 404;
                                    res.status(status).end(http.STATUS_CODES[status]);
                                }
                            });
                        }else{
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
                    });
              }else{
                res.send({
                    MainUserAccountIDMissing: true
                  });
              }
            }else{
                res.send({
                    PasswordMissing: true
                  });
            }
        }else{
            res.send({
                UserNameMissing: true
              });
        }
    });
    app.post('/Api/v1/SubAccounts/Add/', function (req, res) {
        let UserName = req.body.UserName;
        let Password = req.body.Password;
        let MainUserAccountID = req.body.MainUserAccountID;
        if (!isNullOrEmpty(UserName)) {
    
            if (!isNullOrEmpty(Password)) {
    
              if (!isNullOrEmpty(MainUserAccountID)) {
    
              }else{
                res.send({
                    MainUserAccountIDMissing: true
                  });
              }
            }else{
                res.send({
                    PasswordMissing: true
                  });
            }
        }else{
            res.send({
                UserNameMissing: true
              });
        }
    });
}
