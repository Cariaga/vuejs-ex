let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let RoomConfigurationModel = require("../RoomConfiguration/RoomConfigurationModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var async = require("async");
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { //MODIFY
  /*to update exist room notice */
  app.get('/Api/v1/RoomConfiguration/Update/RoomID/:RoomID/RoomNotice/:RoomNotice/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let RoomID = req.params.RoomID;
    let RoomNotice = req.params.RoomNotice;
    if (!isNullOrEmpty(RoomID)) {
      if (!isNullOrEmpty(RoomNotice)) {
        RoomConfigurationModel.RoomConfigurationRoomIDUpdateNotice(RoomID, RoomNotice, function (response) {
          res.send(response);
        });
      }
    }
  });
  /*for maintainace */
  /*to update game information of an existing user room */
  app.get('/Api/v1/RoomConfiguration/Update/RoomID/:RoomID/SmallBlind/:SmallBlind/BigBlind/:BigBlind/Speed/:Speed/GameType/:GameType', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let RoomID = req.params.RoomID;
    let SmallBlind =parseInt(req.params.SmallBlind);
    let BigBlind = parseInt(req.params.BigBlind);
    let Speed = parseInt(req.params.BigBlind);
    let GameType = req.params.BigBlind;

    if (!isNullOrEmpty(RoomID)) {
      if (!isNullOrEmpty(SmallBlind)) {
        if (!isNullOrEmpty(BigBlind)) {
          if (!isNullOrEmpty(Speed)) {
            if (!isNullOrEmpty(GameType)) {
              let IsRoomIDFound = false; // for the update RoomID Must Exist
              async.series([IsRoomIDExistCheck], function (error, response) {

                RoomConfigurationModel.RoomConfigurationRoomIDUpdateSmallBigBlind(RoomID, SmallBlind, BigBlind, Speed, GameType, function (response) {
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
                GameTypeMissing: true
              });
            }
          } else {
            res.send({
              SpeedInvalidValue: true
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
  app.get('/Api/v1/RoomConfiguration/Add/RoomID/:RoomID/GameType/:GameType/SmallBlind/:SmallBlind/BuyIn/:BuyIn/Speed/:Speed/', Management.RouteCalled,Security.rateLimiterMiddleware, Security.verifyToken,function (req, res) {
    //USAGE /Api/v1/RoomConfiguration/Add/RoomID/qwertyui/SmallBlind/0/BigBlind/0/Speed/0
    let RoomID = req.params.RoomID;
    let GameType = req.params.GameType;
    let SmallBlind = req.params.SmallBlind;
    let BigBlind = parseInt(SmallBlind) * 2;
    let Speed = req.params.Speed;
    let BuyIn = req.params.BuyIn;//unused 
    if (!isNullOrEmpty(RoomID)) {
      if (!isNullOrEmpty(SmallBlind)) {
        if (!isNullOrEmpty(Speed)) {
          if (!isNullOrEmpty(BuyIn)) {

            if (validator.isNumeric(BuyIn)) {
              if (validator.isNumeric(SmallBlind)) {
                if (validator.isNumeric(Speed)) {
                  
                  RoomConfigurationModel.AddRoomConfiguration(RoomID, GameType, parseInt(SmallBlind), parseInt(BigBlind), parseInt(Speed), function (response) {
                    console.log(" AddRoomConfiguration Room Added : " +RoomID)
                    if (response != undefined) {
                      let status = 200;
                      res.status(status).end(http.STATUS_CODES[status]);
                    } else {
                      res.send({
                        AddRoomConfigurationFailed: true
                      });
                    }
                  });

                } else {
                  res.send({
                    SpeedInvalidValue: true
                  });
                }

              } else {
                res.send({
                  SmallBlindInvalidValue: true
                });
              }
            } else {
              res.send({
                BuyInInvalidValue: true
              });
            }

          } else {
            res.send({
              BuyInMissing: true
            });
          }

        } else {
          res.send({
            SpeedMissing: true
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
  app.get('/Api/v1/RoomConfiguration/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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
}