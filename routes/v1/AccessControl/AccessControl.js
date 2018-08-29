//var beautify = require("json-beautify");
//let AccessControlModel = require("./AccessControlModel");
var express = require('express');
const router = require('express').Router();

router.get('/eh',function(req,res){
  res.send('test');
});

let MODIFY = function(app) {//MODIFY
 

  /*app.get('/Api/v1/AccessControl/Update/AccessControlID/:AccessControlID/AccessID/:AccessID/AccessName/:AccessName/AccessTags/:AccessTags', function (req, res) {
   
    let AccessControlID = req.params.AccessControlID;
    let AccessID = req.params.AccessID;
    let AccessName = req.params.AccessName;
    let AccessTags = req.params.AccessTags;
    if (!isNullOrEmpty(AccessControlID)) {
      if (!isNullOrEmpty(AccessID)) {
        if (!isNullOrEmpty(AccessName)) {
          if (!isNullOrEmpty(AccessTags)) {
            AccessControlModel.AccessControlUpdate(AccessID, AccessName, AccessTags, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  AccessControlUpdateFailed: true
                });
              }
            });
          } else {
            res.send({
              AccessTagsMissing: true
            });
          }
        } else {
          res.send({
            AccessNameMissing: true
          });
        }
      } else {
        res.send({
          AccessIDMissing: true
        });
      }
    } else {
      res.send({
        AccessControlIDMissing: true
      });
    }
  });*/
};

module.exports = function (app) {//INSERT
  app.get('/Api/v1/AccessControl/Add/AccessID/:AccessID/AccessName/:AccessName/AccessTags/:AccessTags', function (req, res) {
    let AccessID = req.params.AccessID;
    let AccessName = req.params.AccessName;
    let AccessTags = req.params.AccessTags;
    if (!isNullOrEmpty(AccessID)) {
      if (!isNullOrEmpty(AccessName)) {
        if (!isNullOrEmpty(AccessTags)) {
          AddAccessControl(AccessID, AccessName, AccessTags, function (response) {
            if (response != undefined) {
              res.send(response);
            } else {
              res.send({
                AddAccessControlFailed: true
              });
            }
          });
        } else {
          res.send({
            AccessTagsMissing: true
          });
        }
      } else {
        res.send({
          AccessNameMissing: true
        });
      }
    } else {
      res.send({
        AccessIDMissing: true
      });
    }
  });
}
module.exports = function (app) {//STRUCTURE
  app.get('/Api/v1/AccessControl/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.AccessControl.sync( ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.AccessControl.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}
module.exports = router;