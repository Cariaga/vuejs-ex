//var beautify = require("json-beautify");
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let http = require('http');
let AccessControlModel = require("./AccessControlModel");
var isNullOrEmpty = require('is-null-or-empty');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
var Management = require('../../SharedController/Management');
  /*this routes are currently unused in the api */
  /*this route is designed to filter access between UI's of a back office account*/
module.exports = function(app) {//MODIFY
  /*this updates the properties of a route you need to specifiy the access id to be able to set the access name and access tags
  the access tags are techically equivalent to which UI are avilable for access for a group of accounts the access tags are reuseable */
  app.get('/Api/v1/AccessControl/Update/AccessControlID/:AccessControlID/AccessID/:AccessID/AccessName/:AccessName/AccessTags/:AccessTags',Management.RouteCalled,Security.rateLimiterMiddleware, function (req, res) {
    
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
  });
//INSERT
/*this is used for addding new access tags */
  app.get('/Api/v1/AccessControl/Add/AccessID/:AccessID/AccessName/:AccessName/AccessTags/:AccessTags', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let AccessID = req.params.AccessID;
    let AccessName = req.params.AccessName;
    let AccessTags = req.params.AccessTags;
    if (!isNullOrEmpty(AccessID)) {
      if (!isNullOrEmpty(AccessName)) {
        if (!isNullOrEmpty(AccessTags)) {
          AccessControlModel.AddAccessControl(AccessID, AccessName, AccessTags, function (response) {
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

//STRUCTURE
 /* app.get('/Api/v1/AccessControl/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.AccessControl.sync( ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.AccessControl.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });*/
}
