let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let UserAccountModel = require("../UserAccount/UserAccountModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
module.exports = function (app) { //SELECTION

  app.get('/Api/v1/UserAccount/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.UserAccount.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      Models.UserAccount.sync();
      let result = Models.UserAccount.findAll({
        where: {
          UserID: {
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
    //res.send("UserAccount "+Offset+" "+ Limit+" "+Sort);
  });


  //SELECTION
  app.get('/Api/v1/UserAccount/AccountType/:UserAccountID', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      //res.send({success:true});
      DBCheck.AccountTypeFullCheck(UserAccountID, function (response) {
        if (response != undefined) {
          if (!isNullOrEmpty(response) && response.UnSafeDuplicate == false && response.FoundAccount == true) {
            res.send({
              AccountType: response.AccountType
            });
          } else if (!isNullOrEmpty(response) && response.UnSafeDuplicate == true && response.FoundAccount == false) {
            res.send("Duplicate UserAccountID AccountType");
          } else if (!isNullOrEmpty(response) && response.UnSafeDuplicate == false && response.FoundAccount == false) {
            res.send("No Account No Duplicate");
          }
        } else {
          res.send("Somthing Went Wrong With AccountTypeFullCheck");
        }

      });
    } else {
      res.send("Missing params");
    }
  });

  app.get('/Api/v1/UserAccount/Add/AccessID/:AccessID/UserName/:UserName/Password/:Password/', function (req, res) {
    //USAGE
    //Api/v1/UserAccount/Add/AccessID/UserName/Password/true/ValidKey/2018-06-27/01:57:17
    let UserAccountID = uuidv4(); //generated
    let AccessID = req.params.AccessID;
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let ValidKey = uuidv4();
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(AccessID)) {
        if (!isNullOrEmpty(UserName)) {
          if (!isNullOrEmpty(Password)) {
            if (!isNullOrEmpty(ValidKey)) {
              UserAccountModel.AddUserAccount(UserAccountID, AccessID, UserName, Password, ValidKey, function (response) {
                if (response != undefined) {
                  res.send(response);
                } else {
                  res.send({
                    AddUserAccountFailed: true
                  });
                }
              });
            } else {
              res.send({
                ValidKeyMissing: true
              });
            }
          } else {
            res.send({
              PasswordMissing: true
            });
          }
        } else {
          res.send({
            UserNameMissing: true
          });
        }
      } else {
        res.send({
          AccessIDMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });

  app.get('/Api/v1/UserAccount/CheckUserName/UserName/:UserName/', (req, res) => {
    let UserName = req.params.UserName;

    if (!isNullOrEmpty(UserName)) {
      DBCheck.isUserNameExist(UserName, function (response) {
        if (response==true) {
          res.send({UserNameExist:true});
        } else {
          res.send({UserNameExist:false});
        }
      });

    } else {
      res.send({
        UserNameExist: true
      });
    }
  });
  
  app.get('/Api/v1/UserAccount/CheckUserAccountID/UserAccountID/:UserAccountID/', (req, res) => {
    let UserAccountID = req.params.UserAccountID;

    if (!isNullOrEmpty(UserAccountID)) {
      DBCheck.isUserAccountIDExist(UserName, function (response) {
        if (response==true) {
          res.send({UserAccountExist:true});
        } else {
          res.send({UserAccountExist:false});
        }
      });

    } else {
      res.send({
        UserNameExist: true
      });
    }
  });

}