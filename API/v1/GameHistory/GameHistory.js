let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {//MODIFY
  app.get('/Api/v1/GameHistory/Update/GameHistoryID/:GameHistoryID/UserAccountID/:UserAccountID/RoundID/:RoundID/SeasonID/:SeasonID/Rank/:Rank/Score/:Score/Card/:Card/Time/:Time/Date/:Date/BeforePoints/:BeforePoints/AfterPoints/:AfterPoints/', function (req, res) {

    let GameHistoryID = req.params.GameHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let RoundID = req.params.RoundID;
    let SeasonID = req.params.SeasonID;
    let Rank = req.params.Rank;
    let Score = req.params.Score;
    let Card = req.params.Card;
    let Time = req.params.Time;
    let Date = req.params.Date;
    let BeforePoints = req.params.BeforePoints;
    let AfterPoints = req.params.AfterPoints;

    if (!isNullOrEmpty(GameHistoryID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(SeasonID)) {
          if (!isNullOrEmpty(RoundID)) {
            if (!isNullOrEmpty(Rank)) {
              if (!isNullOrEmpty(Score)) {
                if (!isNullOrEmpty(Card)) {
                  if (!isNullOrEmpty(Time)) {
                    if (!isNullOrEmpty(Date)) {
                      if (!isNullOrEmpty(BeforePoints)) {
                        if (!isNullOrEmpty(AfterPoints)) {
                          let isUserAccountIDFound = undefined;
                          async.series([IsUserAccountIDExistCheck, IsGameHistoryIDExistCheck], function (error, response) {

                            //not done
                            if (isUserAccountIDFound == true) {

                              Models.GameHistory.update({
                                  UserAccountID: UserAccountID,
                                  RoundID: RoundID,
                                  SeasonID: SeasonID,
                                  Rank: Rank,
                                  Score: Score,
                                  Card: Card,
                                  Time: Time,
                                  Date: Date,
                                  BeforePoints: BeforePoints,
                                  AfterPoints: AfterPoints
                                }, {
                                  where: {
                                    GameHistoryID: GameHistoryID
                                  }
                                })
                                .then(Success => {
                                  res.send("Updated");
                                })

                                .catch(error => {

                                  console.log("Error Updating");
                                  res.send("Error Updating " + error);
                                });
                              //  res.send({Success:true});
                            } else {
                              res.send({
                                Success: false
                              });
                            }
                          });

                          function IsUserAccountIDExistCheck(callback) {
                            isUserAccountIDExist(UserAccountID, function (response) {
                              if (response != undefined) {
                                isUserAccountIDFound = true;
                                callback(null, '1');
                              } else {
                                isUserAccountIDFound = false;
                                callback(null, '1');
                              }

                            });
                          }

                          function IsGameHistoryIDExistCheck(callback) {
                            callback(null, '2');
                          }
                          res.send({
                            success: true
                          });
                        } else {
                          res.send({
                            AfterPointsMissing: true
                          });
                        }
                      } else {
                        res.send({
                          BeforePointsMissing: true
                        });
                      }
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
                    CardMissing: true
                  });
                }
              } else {
                res.send({
                  ScoreMissing: true
                });
              }
            } else {
              res.send({
                RankMissing: true
              });
            }
          } else {
            res.send({
              RoundIDMissing: true
            });
          }
        } else {

        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        GameHistoryIDMissing: true
      });
    }

    /*
      if(!isNullOrEmpty(GameHistoryID)&&
      !isNullOrEmpty(UserAccountID)&&
      !isNullOrEmpty(RoundID)&&
      !isNullOrEmpty(SeasonID)&&
      !isNullOrEmpty(Rank)&&
      !isNullOrEmpty(Score)&&
      !isNullOrEmpty(Card)&&
      !isNullOrEmpty(Time)&&
      !isNullOrEmpty(Date)&&
      !isNullOrEmpty(BeforePoints)&&
      !isNullOrEmpty(AfterPoints)){
        
      }*/
  });
//SELECTION
  app.get('/Api/v1/GameHistory', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.GameHistory.sync(); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      GameHistory(function (response) {
        if (response != undefined) {
          res.send(res.send(beautify(response, null, 2, 100)));
        } else {
          res.send([]);
        }

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
    //res.send("GameHistory "+Offset+" "+ Limit+" "+Sort);
  });
  //INSERT
  app.get('/Api/v1/GameHistory/Add/UserAccountID/:UserAccountID/SeasonID/:SeasonID/RoundID/:RoundID/Rank/:Rank/Score/:Score/Card/:Card/Time/:Time/Date/:Date/BeforePoints/:BeforePoints/AfterPoints/:AfterPoints/', function (req, res) {
    //USAGE /Api/v1/GameHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/SeasonID/qwertyui/RoundID/someRound/Rank/STRAIGHT/Score/1608/Card/["6D","5S","4C","3H","2D"]/Time/01:57:17/Date/2018-06-27/BeforePoints/0/AfterPoints/0/
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let RoundID = req.params.RoundID;
    let SeasonID = req.params.SeasonID;
    let Rank = req.params.Rank;
    let Score = req.params.Score;
    let Card = req.params.Card;
    let Time = req.params.Time;
    let Date = req.params.Date;
    let BeforePoints = req.params.BeforePoints;
    let AfterPoints = req.params.AfterPoints;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(RoundID)) {
        if (!isNullOrEmpty(SeasonID)) {
          if (!isNullOrEmpty(Rank)) {
            if (!isNullOrEmpty(Score)) {
              if (!isNullOrEmpty(Card)) {
                if (!isNullOrEmpty(Time)) {
                  if (!isNullOrEmpty(Date)) {
                    if (!isNullOrEmpty(BeforePoints)) {
                      if (!isNullOrEmpty(AfterPoints)) {
                        if (validator.isNumeric(BeforePoints)) {
                          if (validator.isNumeric(AfterPoints)) {
                            if (validator.isNumeric(Score)) {
                              let countedCards = Card.split(","); //card counting validate that we have 5 cards
                              let countedStringLength = Card.length; //Must be 14 including commas in count
                              if (countedCards.length == 5 && countedStringLength == 14) {
                                if (Rank == "HIGH_CARD" ||
                                  Rank == "ONE_PAIR" ||
                                  Rank == "TWO_PAIRS" ||
                                  Rank == "THREE_OF_A_KIND" ||
                                  Rank == "STRAIGHT" ||
                                  Rank == "FLUSH" ||
                                  Rank == "FULL_HOUSE" ||
                                  Rank == "FOUR_OF_A_KIND" ||
                                  Rank == "STRAIGHT_FLUSH" ||
                                  Rank == "ROYAL_FLUSH") {
                                  let isUserAccountIDExistFound = false;
                                  let isSeasonIDFound = false;
                                  async.series([IsUserAccountIDExistCheck, IsSeasonIDExistCheck], function (error, response) {

                                    if (isUserAccountIDExistFound == true) {
                                      if (isSeasonIDFound == true) {
                                        AddGameHistory(UserAccountID, RoundID, SeasonID, Rank, Score, Card, Time, Date, BeforePoints, AfterPoints, function (response) {
                                          res.send(response);
                                        });
                                      } else {
                                        res.send({
                                          SeasonIDInvalid: false
                                        });
                                      }
                                    } else {
                                      res.send({
                                        UserAccountIDInvalid: false
                                      });
                                    }
                                  });

                                  function IsUserAccountIDExistCheck(callback) {
                                    isUserAccountIDExist(UserAccountID, function (response) {
                                      if (response != undefined) {
                                        isUserAccountIDExistFound = true;
                                        callback(null, '1');
                                      } else {
                                        isUserAccountIDExistFound = false;
                                        callback(null, '1');
                                      }
                                    });
                                  }

                                  function IsSeasonIDExistCheck(callback) {
                                    IsSeasonIDExist(SeasonID, function (response) {
                                      if (response != undefined) {
                                        isSeasonIDFound = true;
                                        callback(null, '2');
                                      } else {
                                        isSeasonIDFound = false;
                                        callback(null, '2');
                                      }
                                    });
                                  }
                                } else {
                                  res.send({
                                    CardInvalid: true
                                  });
                                }

                              } else {
                                res.send({
                                  RequiresCards: 5
                                });
                              }
                            } else {
                              res.send({
                                ScoreInvalidValue: true
                              });
                            }
                          } else {
                            res.send({
                              AfterPointsInvalidValue: true
                            });
                          }
                        } else {
                          res.send({
                            BeforePointsInvalidValue: true
                          });
                        }




                      } else {
                        res.send({
                          AfterPoints: true
                        });
                      }
                    } else {
                      res.send({
                        BeforePoints: true
                      });
                    }
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
                  CardMissing: true
                });
              }
            } else {
              res.send({
                ScoreMissing: true
              });
            }
          } else {
            res.send({
              RankMissing: true
            });
          }
        } else {
          res.send({
            SeasonIDMissing: true
          });
        }
      } else {
        res.send({
          RoundIDMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }

  });
//STRUCTURE
  app.get('/Api/v1/GameHistory/Clear', function (req, res) {
    Models.GameHistory.destroy({
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
  app.get('/Api/v1/GameHistory/Delete', function (req, res) {
    Models.GameHistory.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors
  
      res.send("Error " + result);
    });
  });
  app.get('/Api/v1/GameHistory/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.GameHistory.sync(); //Never call Alter or Force during a Database table Alter process before knowing that it can query select all first
    Models.GameHistory.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}
