let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let RoomConfigurationModel = require("../RoomConfiguration/RoomConfigurationModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
module.exports = function (app) { //MODIFY
  app.get('/Api/v1/RoomConfiguration/Update/RoomID/:RoomID/SmallBlind/:SmallBlind/BigBlind/:BigBlind/', function (req, res) {
    let RoomID = req.params.RoomID;
    let SmallBlind = req.params.SmallBlind;
    let BigBlind = req.params.BigBlind;

    if (!isNullOrEmpty(RoomID)) {
      if (!isNullOrEmpty(SmallBlind)) {
        if (!isNullOrEmpty(BigBlind)) {
          let IsRoomIDFound = false; // for the update RoomID Must Exist
          async.series([IsRoomIDExistCheck], function (error, response) {
            
            RoomConfigurationModel.RoomConfigurationRoomIDUpdateSmallBigBlind(RoomID, SmallBlind, BigBlind, function (response) {
              if (IsRoomIDFound == true) {
                res.send(response);
              } else {
                res.send({});
              }
            });
          });

          function IsRoomIDExistCheck(callback) {
            DBCheck.IsRoomIDExist(SeasonID, function (response) {
              if (response != undefined) {
                IsRoomIDFound = true;
                callback(null, '1');
              } else {
                IsRoomIDFound = false;
                callback(null, '1');
              }
            });
          }

        } else {
          res.send({
            BigBlindMissing: true
          });
        }
      } else {
        res.send({
          SmallBlindMissing: true
        });
      }
    } else {
      res.send({
        RoomIDMissing: true
      });
    } 
  });
  //INSERT
  app.get('/Api/v1/RoomConfiguration/Add/RoomID/:RoomID/SmallBlind/:SmallBlind/BigBlind/:BigBlind/Speed/:Speed', function (req, res) {
    //USAGE /Api/v1/RoomConfiguration/Add/RoomID/qwertyui/SmallBlind/0/BigBlind/0/Speed/0
    let RoomID = req.params.RoomID;
    let SmallBlind = req.params.SmallBlind;
    let BigBlind = req.params.BigBlind;
    let Speed = req.params.Speed;

    if (!isNullOrEmpty(RoomID)) {
      if (!isNullOrEmpty(SmallBlind)) {
        if (!isNullOrEmpty(BigBlind)) {
          if (!isNullOrEmpty(Speed)) {
            if (validator.isNumeric(SmallBlind)) {
              if (validator.isNumeric(BigBlind)) {
                if (validator.isNumeric(Speed)) {

                  let IsRoomIDFound = false; //false is the result we want
                  async.series([IsRoomIDExistCheck], function (error, response) {
                    if (IsRoomIDFound == false) { //must be false to be valid
                      //Not Done
                      /* AddRoomConfiguration(RoomID,SmallBlind,BigBlind,Speed,function(response){
                        res.send(response);
                       });*/
                      res.send({
                        Success: true
                      });
                    } else {
                      res.send({
                        RoomIDAlreadyExist: true
                      });
                    }

                  });

                  function IsRoomIDExistCheck(callback2) {
                    DBCheck.IsRoomIDExist(RoomID, function (response2) {
                      if (response2 != undefined) {
                        IsRoomIDFound = true;
                        callback2(null, '1');
                      } else {
                        IsRoomIDFound = false;
                        callback2(null, '1');
                      }
                    });
                  }


                } else {
                  res.send({
                    SpeedInvalidValue: true
                  });
                }
              } else {
                res.send({
                  BigBlindInvalidValue: true
                });
              }
            } else {
              res.send({
                SmallBlindInvalidValue: true
              });
            }
          } else {
            res.send({
              SpeedMissing: true
            });
          }
        } else {
          res.send({
            BigBlindMissing: true
          });
        }
      } else {
        res.send({
          SmallBlindMissing: true
        });
      }
    } else {
      res.send({
        RoomIDMissing: true
      });
    }
  });
  //SELECTION
  app.get('/Api/v1/RoomConfiguration/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.RoomConfiguration.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      RoomConfigurationModel.RoomConfiguration(function (response) {
        if (response != undefined) {
          res.send(beautify(response, null, 2, 100));
        } else {
          res.send({});
        }
      });
    }
  });

  app.get('/Api/v1/RoomConfiguration/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.RoomConfiguration.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.RoomConfiguration.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
  app.get('/Api/v1/RoomConfiguration/Clear', function (req, res) {

    Models.RoomConfiguration.destroy({
      where: {},
      truncate: true
    }).then(function (result) {
      sequelize.queryInterface.removeConstraint('GameHistory', 'SeasonID');
      res.send("Cleared");
    }).catch(function (result) { //catching any then errors

      res.send("Error " + result);
    });
  });
  app.get('/Api/v1/RoomConfiguration/Delete', function (req, res) {
    res.send("UnImplemented");
    /* Models.RoomConfiguration.sync();
    sequelize.query('DROP TABLE RoomConfigurations', { model: Models.RoomConfiguration }).then(RoomConfiguration => {
      // Each record will now be a instance of Project
      res.send(RoomConfiguration);
    }).catch(error=>{
      res.send(error);
    });*/
  });
}