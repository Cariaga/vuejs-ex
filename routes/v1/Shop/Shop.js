var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {//MODIFY
  app.get('/Api/v1/Shop/Update/:ShopID/:UserAccountID/:DistributorID/:Description/', function (req, res) {
    let ShopID = req.params.ShopID;
    let UserAccountID = req.params.UserAccountID;
    let DistributorID = req.params.DistributorID;
    let Description = req.params.Description;
    if (!isNullOrEmpty(ShopID) &&
      !isNullOrEmpty(UserAccountID) &&
      !isNullOrEmpty(DistributorID) &&
      !isNullOrEmpty(Description)) {
      Models.Shop.update({
          UserAccountID: UserAccountID,
          DistributorID: DistributorID,
          Description: Description
        }, {
          where: {
            ShopID: ShopID
          }
        })
        .then(Success => {
          res.send("Updated");
        })

        .catch(error => {
          // mhhh, wth!
          console.log("Error Updating");
          res.send("Error Updating " + error);
        });
    }
  });
  //SELECTION
  app.get('/Api/v1/Shop/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.Shop.sync(); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      let result = Models.Shop.findAll({
        where: {
          ShopID: {
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
    //  res.send("Shop "+Offset+" "+ Limit+" "+Sort);
  });
  app.get('/Api/v1/Shop/Validate/:UserAccountID/', function (req, res) { //check for validation only
    //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      isShopUserAccountIDExist(UserAccountID, function (response) {
        if (!isNullOrEmpty(response) && response.length > 0) {
          res.send({
            isShop: true
          });
        } else {
          res.send({
            isShop: false
          });
        }
  
      });
    } else {
      res.send("Missing params");
    }
  });
  //INSERT
  app.get('/Api/v1/Shop/Add/:UserAccountID/:DistributorID/:Description/', function (req, res) {
    //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
    let UserAccountID = req.params.UserAccountID;
    let DistributorID = req.params.DistributorID;
    let Description = req.params.Description;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(DistributorID)) {
        if (!isNullOrEmpty(Description)) {
          AddShop(UserAccountID, DistributorID, Description, function (response) {
            if (response != undefined) {
              res.send(response);
            } else {
              res.send({
                AddShopFailed: true
              });
            }
          });
        } else {
          res.send({
            DescriptionMissing: true
          });
        }
      } else {
        res.send({
          DistributorIDMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  //STRUCTURE
  app.get('/Api/v1/Shop/Clear', function (req, res) {
    Models.Shop.destroy({
        where: {
          UserID: 1
        },
        truncate: true
      }).then(Success => {
        res.send("Cleared");
      })
      .catch(err => {
        res.send("Truncate " + err);
      });
  });
  app.get('/Api/v1/Shop/Delete', function (req, res) {
    Models.Shop.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors
  
      res.send("Error " + result);
    });
  });
  app.get('/Api/v1/Shop/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.Shop.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.Shop.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}