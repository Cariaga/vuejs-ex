//--Select Start
module.exports = function (app) {
  app.get('/Api/v1/BankInformation/Update/:BankInformationID/:UserAccountID/:BankName/:SecurityCode/:Expiration/:Time/:Date', function (req, res) {
    let BankInformationID = req.params.BankInformationID;
    let UserAccountID = req.params.UserAccountID;
    let BankName = req.params.BankName;
    let SecurityCode = req.params.SecurityCode;
    let Expiration = req.params.Expiration;
    let Time = req.params.Time;
    let Date = req.params.Date;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(BankInformationID)) {
        if (!isNullOrEmpty(BankName)) {
          if (!isNullOrEmpty(SecurityCode)) {
            if (!isNullOrEmpty(Expiration)) {
              if (!isNullOrEmpty(Time)) {
                if (!isNullOrEmpty(Date)) {
                  BankInformationUpdate(UserAccountID, BankInformationID, BankName, SecurityCode, Expiration, Time, Date, function (response) {
                    if (response != undefined) {
                      res.send(response);
                    } else {
                      res.send({
                        BankInformationUpdateFailed: true
                      });
                    }
                  });
                } else {
                  res.send({
                    DateMissing: true
                  });
                }
              } else {
                res.send({
                  TimeMissing: true
                });
              }
            } else {
              res.send({
                ExpirationMissing: true
              });
            }
          } else {
            res.send({
              SecurityCodeMissing: true
            });
          }
        } else {
          res.send({
            BankNameMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        BankInformationIDMissing: true
      });
    }
  });
}
module.exports = function (app) {
  app.get('/Api/v1/BankInformation/Add/:UserAccountID/:BankName/:SecurityCode/:Valid/:Expiration/:Time/:Date', function (req, res) {
    //Uasge /Api/v1/BankInformation/Add/UserAccountID/BankName/SecurityCode/Valid/2018-06-27/01:57:17/2018-06-27
    let UserAccountID = req.params.UserAccountID;
    let BankName = req.params.BankName;
    let SecurityCode = req.params.SecurityCode;
    let Valid = req.params.Valid;
    let Expiration = req.params.Expiration;
    let Time = req.params.Time;
    let Date = req.params.Date;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(BankName)) {
        if (!isNullOrEmpty(SecurityCode)) {
          if (!isNullOrEmpty(Valid)) {
            if (!isNullOrEmpty(Expiration)) {
              if (!isNullOrEmpty(Time)) {
                if (!isNullOrEmpty(Date)) {
                  BankInformationAdd(UserAccountID, BankName, SecurityCode, Valid, Expiration, Time, Date, function (response) {
                    if (response) {
                      res.send(response);
                    } else {
                      res.send({
                        BankInformationAddFailed: true
                      });
                    }
                  });
                } else {
                  res.send({
                    DateMissing: true
                  });
                }
              } else {
                res.send({
                  TimeMissing: true
                });
              }
            } else {
              res.send({
                ExpirationMissing: true
              });
            }
          } else {
            res.send({
              ValidMissing: true
            });
          }
        } else {
          res.send({
            SecurityCodeMissing: true
          });
        }
      } else {
        res.send({
          BankNameMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
}
module.exports = function (app) {
  app.get('/Api/v1/BankInformation/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.BankInformation.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      Models.BankInformation.sync();
      let result = Models.BankInformation.findAll({
        where: {
          BankInformationID: {
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
    //res.send("BankInformation "+Offset+" "+ Limit+" "+Sort);
  });
  app.get('/Api/v1/BankInformation/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.BankInformation.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.BankInformation.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}

//--Select End

//--Update Start
//--Update End

//---BankInformation ROUTING START



/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} BankName
 * @param {*} SecurityCode
 * @param {*} Valid
 * @param {*} Expiration
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function BankInformationAdd(UserAccountID, BankName, SecurityCode, Valid, Expiration, Time, Date, callback) {
  var item1 = Models.BankInformation.build({
    UserAccountID: UserAccountID,
    BankName: BankName,
    SecurityCode: SecurityCode,
    Valid: Valid,
    Expiration: Expiration,
    Time: Time,
    Date: Date
  });
  Models.BankInformation.sync({
    alter: true /*,force:true*/
  }); //force recreates deletes old table
  item1.save().then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });
}

app.get('/Api/v1/BankInformation/Clear', function (req, res) {
  Models.BankInformation.destroy({
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
app.get('/Api/v1/BankInformation/Delete', function (req, res) {
  Models.BankInformation.sync({
    force: true
  }).then(function (result) {
    res.send("Deleted");
  }).catch(function (result) { //catching any then errors

    res.send("Error " + result);
  });
});