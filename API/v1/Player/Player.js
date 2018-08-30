let DBConnect = require("../../SharedController/DBConnect");
let DBConnect = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {//MODIFY
  app.get('/Api/v1/Player/Update/UserAccountID/:UserAccountID/AddPoint/:Point', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Point = req.params.Point;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Point)) {
        if (validator.isInt(Point) == true) {
          let UserAccountIDExist = false;
          let CurrentPoints = undefined;
          async.series([UserAccountIDCheck, PlayerCurrentPointsCheck], function (error, response) {

            if (UserAccountIDExist == true) {
              let NewPoints = parseInt(CurrentPoints) + parseInt(Point);
              if (!(parseInt(Point) < 0)) {
                if (parseInt(Point) != 0) {
                  if (NewPoints >= 0) {

                    PlayerUpdatePoint(UserAccountID, NewPoints, function (response) {
                      if (response != undefined) {
                        res.send(response);
                      } else {
                        res.send({
                          PlayerUpdatePointFailed: true
                        });
                      }
                    });
                  }
                } else {
                  res.send({
                    NothingToAdd: true
                  });
                }
              } else {
                res.send({
                  IsPointNegativeValue: true
                });
              }

            } else {
              res.send({
                UserAccountIDExist: false
              });
            }


          });

          function UserAccountIDCheck(callback) {
            if (!isNullOrEmpty(UserAccountID) && UserAccountID != undefined) {
              isUserAccountIDExist(UserAccountID, function (response) {
                let obj = response;
                if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].UserAccountID == UserAccountID) {
                  UserAccountIDExist = true;
                  callback(null, '1');
                } else {
                  UserAccountIDExist = false;
                  callback(null, '1');
                }
              });
            } else {

              callback(null, '1');
            }
          }

          function PlayerCurrentPointsCheck(callback) {
            if (UserAccountIDExist != undefined) {
              PlayerUserAccountID(UserAccountID, function (response) {
                let obj = response;
                if (obj != undefined && obj[0].CurrentPoints != undefined) {
                  CurrentPoints = obj[0].CurrentPoints;
                  callback(null, '1');
                } else {
                  CurrentPoints = undefined;
                  callback(null, '1');
                }
              });
            } else {
              callback(null, '1');
            }
          }
        } else {
          res.send({
            PointInvalidValue: true
          });
        }
      } else {
        res.send({
          PointEmpty: true
        });
      }
    } else {
      res.send({
        UserAccountIDEmpty: true
      });
    }
  });
  app.get('/Api/v1/Player/Update/PlayersID/:PlayersID/UserAccountID/:UserAccountID/ShopID/:ShopID/ScreenName/:ScreenName/Name/:Name/Surname/:Surname/CurrentRoomName/:CurrentRoomName', function (req, res) {
    let PlayersID = req.params.PlayersID;
    let UserAccountID = req.params.UserAccountID;
    let ShopID = req.params.ShopID;
    let ScreenName = req.params.ScreenName;
    let Name = req.params.Name;
    let Surname = req.params.Surname;
    let CurrentRoomName = req.params.CurrentRoomName;

    if (!isNullOrEmpty(PlayersID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(ShopID)) {
          if (!isNullOrEmpty(ScreenName)) {
            if (!isNullOrEmpty(Name)) {
              if (!isNullOrEmpty(Surname)) {
                if (!isNullOrEmpty(CurrentRoomName)) {
                  PlayerUpdate(PlayersID, UserAccountID, ShopID, ScreenName, Name, Surname, CurrentRoomName, function (response) {
                    if (response != undefined) {
                      res.send(response);
                    } else {
                      res.send({
                        PlayerUpdateFailed: true
                      });
                    }
                  });
                } else {
                  res.send({
                    CurrentRoomNameMissing: true
                  });
                }
              } else {
                res.send({
                  SurnameMissing: true
                });
              }
            } else {
              res.send({
                NameMissing: true
              });
            }
          } else {
            res.send({
              ScreenNameMissing: true
            });
          }
        } else {
          res.send({
            ShopIDMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        PlayersIDMissing: true
      });
    }
  });
  app.get('/Api/v1/Player/Update/UserAccountID/:UserAccountID/SubtractPoint/:Point', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Point = req.params.Point;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Point)) {
        if (validator.isInt(Point) == true) {
          let UserAccountIDExist = false;
          let CurrentPoints = undefined;
          async.series([UserAccountIDCheck, PlayerCurrentPointsCheck], function (error, response) {
            if (UserAccountIDExist == true) {
              let NewPoints = parseInt(CurrentPoints) - parseInt(Point);
              if (!(parseInt(Point) < 0)) {
                if (parseInt(Point) != 0) {
                  if (NewPoints >= 0) {
                    if (UserAccountIDExist == true) {
                      PlayerUpdatePoint(UserAccountID, NewPoints, function (response) {
                        if (response != undefined) {
                          res.send(response);
                        } else {
                          res.send({
                            PlayerUpdatePointFailed: true
                          });
                        }
                      });
                    } else {
                      res.send({
                        UserAccountIDExist: false
                      });
                    }
                  } else {
                    res.send({
                      NotEnoughPoints: true
                    });
                  }
                } else {
                  res.send({
                    NothingToSubtract: true
                  });
                }
              } else {
                res.send({
                  IsPointNegativeValue: true
                });
              }
            } else {
              res.send({
                UserAccountIDEmpty: true
              });
            }


          });

          function UserAccountIDCheck(callback) {
            if (!isNullOrEmpty(UserAccountID) && UserAccountID != undefined) {
              isUserAccountIDExist(UserAccountID, function (response) {
                let obj = response;
                if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].UserAccountID == UserAccountID) {
                  UserAccountIDExist = true;
                  callback(null, '1');
                } else {
                  UserAccountIDExist = false;
                  callback(null, '1');
                }
              });
            } else {

              callback(null, '1');
            }
          }

          function PlayerCurrentPointsCheck(callback) {
            if (UserAccountIDExist != undefined) {
              PlayerUserAccountID(UserAccountID, function (response) {
                let obj = response;
                if (obj != undefined && obj[0].CurrentPoints != undefined) {
                  CurrentPoints = obj[0].CurrentPoints;
                  callback(null, '1');
                } else {
                  CurrentPoints = undefined;
                  callback(null, '1');
                }
              });
            } else {
              callback(null, '1');
            }
          }
        } else {
          res.send({
            PointInvalidValue: true
          });
        }
      } else {
        res.send({
          PointEmpty: true
        });
      }
    } else {
      res.send({
        UserAccountIDEmpty: true
      });
    }
  });
  app.get('/Api/v1/Player/Update/UserAccountID/:UserAccountID/CurrentRoomName/:CurrentRoomName', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let CurrentRoomName = req.params.CurrentRoomName;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(CurrentRoomName)) {
        let UserAccountIDExist = false;
        async.series([UserAccountIDCheck], function (error, response) {
          if (UserAccountIDExist == true) {
            PayerUpdateRoomName(UserAccountID, CurrentRoomName, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  PayerUpdateRoomNameUpdateFailed: true
                });
              }
            });
          } else {
            res.send({
              UserAccountIDExist: false
            });
          }
        });

        function UserAccountIDCheck(callback) {
          isUserAccountIDExist(UserAccountID, function (response) {
            let obj = response;
            if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].UserAccountID == UserAccountID) {
              UserAccountIDExist = true;
              callback(null, '1');
            } else {
              UserAccountIDExist = false;
              callback(null, '1');
            }
          });
        }

      } else {
        res.send({
          CurrentRoomNameEmpty: true
        });
      }
    } else {
      res.send({
        UserAccountIDEmpty: true
      });
    }
  });
  app.get('/Api/v1/Player/ShopID/:ShopID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let ShopID = req.params.ShopID;
    if (!isNullOrEmpty(ShopID)) {
      ChildPlayersFromShopID(ShopID, function (response) {
        if (response != undefined) {
          res.send(beautify(response, null, 2, 100));
        } else {
          res.send([]);
        }
      });
    } else {
      res.send({
        ShopIDMissing: true
      });
    }
  });

  app.get('/Api/v1/Player/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.Player.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {

      let result = Models.Player.findAll({
        where: {
          PlayersID: {
            ne: null //not null
          }
        }
      }).then(function (result) {
        let Data = result.map(function (item) {
          return item;

        });
        res.send(beautify(Data, null, 2, 100));
      }).catch(function (result) {

        res.send("Error " + result);
      });
      //res.send("Player "+Offset+" "+ Limit+" "+Sort);
    }
    if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {
      res.send("Player " + Offset + " " + Limit + " " + Sort);
    }
    if (!isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      res.send("Player " + Offset + " " + Limit + " " + Sort);
    }
    if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {
      res.send("Player " + Offset + " " + Limit + " " + Sort);
    }
    if (isNullOrEmpty(Offset) && !isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {
      res.send("Player " + Offset + " " + Limit + " " + Sort);
    }
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && !isNullOrEmpty(Sort)) {
      res.send("Player " + Offset + " " + Limit + " " + Sort);
    }
    if (!isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      res.send("Player " + Offset + " " + Limit + " " + Sort);
    }
  });
  //INSERT
  app.get('/Api/v1/Player/Add/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {
    //USAGE /Api/v1/Player/Add/528861d4-3e49-4223-9b1a-913d72112112/1/ScreenName/Name/Surname/CurrentRoomName
    let UserAccountID = req.params.UserAccountID;
    let ShopID = req.params.ShopID;
    let ScreenName = req.params.ScreenName;
    let Name = req.params.Name;
    let Surname = req.params.Surname;
    let CurrentRoomName = req.params.CurrentRoomName;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(ShopID)) {
        if (!isNullOrEmpty(ScreenName)) {
          if (!isNullOrEmpty(Name)) {
            if (!isNullOrEmpty(Surname)) {
              if (!isNullOrEmpty(CurrentRoomName)) {
                AddPlayer(UserAccountID, ShopID, ScreenName, Name, Surname, CurrentRoomName, function (response) {
                  if (response != undefined) {
                    res.send(response);
                  } else {
                    res.send({
                      AddPlayerFailed: true
                    });
                  }
                });
              } else {
                res.send({
                  CurrentRoomNameMissing: true
                });
              }
            } else {
              res.send({
                SurnameMissing: true
              });
            }
          } else {
            res.send({
              NameMissing: true
            });
          }
        } else {
          res.send({
            ScreenNameMissing: true
          });
        }
      } else {
        res.send({
          ShopIDMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });

  app.get('/Api/v1/Player/Validate/:UserAccountID/', function (req, res) { //check for validation only
    //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      isPlayerUserAccountIDExist(UserAccountID, function (response) {
        if (!isNullOrEmpty(response) && response.length > 0) {
          res.send({
            isPlayer: true
          });
        } else {
          res.send({
            isPlayer: false
          });
        }
      });
    } else {
      res.send("Missing params");
    }
  });
  //STRUCTURE
  app.get('/Api/v1/Player/Clear', function (req, res) {
    Models.Player.destroy({
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
  app.get('/Api/v1/Player/Delete', function (req, res) {
  
    Models.Player.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors
  
      res.send("Error " + result);
    });
  });
  app.get('/Api/v1/Player/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.Player.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.Player.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}
