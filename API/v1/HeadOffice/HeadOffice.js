var beautify = require("json-beautify");
module.exports = function (app) {
  app.get('/Api/v1/HeadOffice/Add/:UserAccountID/:Name/:Description/', function (req, res) {
    //Usage Api/v1/HeadOffice/Add/UserAccountID/Name/Description/
    let UserAccountID = req.params.UserAccountID;
    let Name = req.params.Name;
    let Description = req.params.Description;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Name)) {
        if (!isNullOrEmpty(Description)) {
          AddHeadOffice(UserAccountID, Name, Description, function (response) {
            if (response != undefined) {
              res.send(response);
            } else {
              res.send({
                AddHeadOfficeFailed: true
              });
            }
          });
        } else {
          res.send({
            DescriptionMissing: true
          })
        }
      } else {
        res.send({
          NameMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
}



app.get('/Api/v1/HeadOffice/Validate/:UserAccountID/', function (req, res) { //check for validation only
  let UserAccountID = req.params.UserAccountID;
  if (!isNullOrEmpty(UserAccountID)) {
    isHeadOfficeUserAccountIDExist(UserAccountID, function (response) {
      if (!isNullOrEmpty(response) && response.length > 0) {
        res.send({
          isHeadOffice: true
        });
      } else {
        res.send({
          isHeadOffice: false
        });
      }
    });
  } else {
    res.send("Missing params");
  }
});
module.exports = function (app) {
  app.get('/Api/v1/HeadOffice/Clear', function (req, res) {
    Models.HeadOffice.destroy({
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
  app.get('/Api/v1/HeadOffice/Delete', function (req, res) {
    Models.HeadOffice.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors
  
      res.send("Error " + result);
    });
  });
  app.get('/Api/v1/HeadOffice/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.HeadOffice.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.HeadOffice.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}

app.get('/Api/v1/HeadOffice/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset = req.query.Offset;
  let Limit = req.query.Limit;
  let Sort = req.query.Sort;
  Models.HeadOffice.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
    let result = Models.HeadOffice.findAll({
      where: {
        HeadOfficeID: {
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
  if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {}
  if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {}
  if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {}
  if (isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {}
  if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {}
  if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {}
  // res.send("HeadOffice "+Offset+" "+ Limit+" "+Sort);
});


app.get('/Api/v1/HeadOffice/Update/:HeadOfficeID/:UserAccountID/:Name/:Name/', function (req, res) {
  let HeadOfficeID = req.params.HeadOfficeID;
  let UserAccountID = req.params.UserAccountID;
  let Name = req.params.Name;

  if (!isNullOrEmpty(HeadOfficeID)) {
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Name)) {
        HeadOfficeUpdate(HeadOfficeID, UserAccountID, Name, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            res.send({
              HeadOfficeUpdateFailed: true
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
        UserAccountIDMissing: true
      });
    }
  } else {
    res.send({
      HeadOfficeIDMissing: true
    });
  }
});