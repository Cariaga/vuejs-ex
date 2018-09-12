let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let DistributorModel = require("../Distributor/DistributorModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');

// front end use
module.exports.RegisterDistributor = function RegisterHeadOffice(UserAccountID,Name,PhoneNumber,UserName,Password,Commission,callback){
  let _UserAccountID = UserAccountID;
  let _Name = Name;
  let _PhoneNumber = PhoneNumber;
  let _UserName = UserName;
  let _Password = Password;
  let _Commission = Commission;
  
  function Q1(){
    let query = "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`, `OnlineStatus`, `Verified`, `Key`) "+
    " VALUES ('"+_UserAccountID+"', '"+_UserName+"', '"+_Password+"', now(), 'Offline', 'true', null);";
    return new Promise(resolve => {
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          resolve(undefined);
        }
      });
    });
  }
  function Q2(){
    let query ="INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`, `TelephoneNumber`) "+
    "VALUES ('"+_UserAccountID+"', null, '"+_PhoneNumber+"', null);";
    return new Promise(resolve => {
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          resolve(undefined);
        }
      });
    });
  }
  function Q3(){
    let query = "INSERT INTO `sampledb`.`headoffices` (`UserAccountID`,`Name`,`Commission`) VALUES ('"+_UserAccountID+"', '"+_Name+"', '"+_Commission+"');";
    return new Promise(resolve => {
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          resolve(undefined);
        }
      });
    });
  }
  async function RunAsync() {
    console.log('calling');
    let finalresult = [{}];
    let result = await Q1();
    let result2 = await Q2();
    let result3 = await Q3();
    console.log('Done');
    callback('done');
  }
  RunAsync();
}
module.exports = function (app) {//SELECTION
  app.get('/Api/v1/Distributor/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.Distributor.sync(); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      let result = Models.Distributor.findAll({
        where: {
          DistributorID: {
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
    //res.send("Distributor "+Offset+" "+ Limit+" "+Sort);
  });
  app.get('/Api/v1/Distributor/Validate/:UserAccountID/', function (req, res) { //check for validation only
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      DBCheck.isDistributorUserAccountIDExist(UserAccountID, function (response) {
        if (!isNullOrEmpty(response) && response.length > 0) {
          res.send({
            isDistributer: true
          });
        } else {
          res.send({
            isDistributer: false
          });
        }
      });
    } else {
      res.send("Missing params");
    }
  });
//MODIFY
  app.get('/Api/v1/Distributor/Update/DistributorID/:DistributorID/UserAccountID/:UserAccountID/HeadOfficeID/:HeadOfficeID/Name/:Name/', function (req, res) {
    let DistributorID = req.params.DistributorID;
    let UserAccountID = req.params.UserAccountID;
    let HeadOfficeID = req.params.HeadOfficeID;
    let Name = req.params.Name;
    if (!isNullOrEmpty(DistributorID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(HeadOfficeID)) {
          if (!isNullOrEmpty(Name)) {
            DistributorModel.DistributorUpdate(UserAccountID, HeadOfficeID, Name, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  DistributorUpdateFailed: true
                });
              }
            });
          } else {
            res.send({
              NameFailed: true
            });
          }
        } else {
          res.send({
            HeadOfficeIDFailed: true
          });
        }
      } else {
        res.send({
          UserAccountIDFailed: true
        });
      }
    } else {
      res.send({
        DistributorIDFailed: true
      });
    }
  });
//INSERT
  app.get('/Api/v1/Distributor/Add/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {
    //Usage /Api/v1/Distributor/Add/UserAccountID/HeadOfficeID/Name/
    let UserAccountID = req.params.UserAccountID;
    let HeadOfficeID = req.params.HeadOfficeID;
    let Name = req.params.Name;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(HeadOfficeID)) {
        if (!isNullOrEmpty(Name)) {
          DistributorModel.AddDistributor(UserAccountID, HeadOfficeID, Name, function (response) {
            if (response != undefined) {
              res.send(response);
            } else {
              res.send({
                AddDistributorFailed: true
              });
            }
          });
        } else {
          res.send({
            NameMissing: true
          });
        }
      } else {
        res.send({
          HeadOfficeIDMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });

  app.get('/Api/v1/Shop/DistributorID/:DistributorID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let DistributorID = req.params.DistributorID;
    if (!isNullOrEmpty(DistributorID)) {
      DistributorModel.ChildShopsFromDistributorID(DistributorID, function (response) {
        if (response != undefined) {
          res.send(beautify(response, null, 2, 100));
        } else {
          res.send([]);
        }
      });
    } else {
      res.send({
        DistributorIDMissing: true
      });
    }
  });
  //STRUCTURE
  app.get('/Api/v1/Distributor/Clear', function (req, res) {
    Models.Distributor.destroy({
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
  app.get('/Api/v1/Distributor/Delete', function (req, res) {
    Models.Distributor.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors

      res.send("Error " + result);
    });
  });
  app.get('/Api/v1/Distributor/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.Distributor.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.Distributor.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}
