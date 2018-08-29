var beautify = require("json-beautify");
module.exports = function (app) {
  app.get('/Api/v1/SupportTicket/Add/UserAccountID/:UserAccountID/Title/:Title/Description/:Description/Reason/:Reason/Time/:Time/Date/:Date/Status/:Status', function (req, res) {
    ///USAGE /Api/v1/SupportTicket/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Title/Title/Description/Description/Reason/Reason/Time/01:57:17/Date/2018-06-27/Status/Status
    let UserAccountID = req.params.UserAccountID;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Reason = req.params.Reason;
    let Time = req.params.Time;
    let Date = req.params.Date;
    let Status = req.params.Status;
    Models.SupportTicket.sync(); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Title)) {
        if (!isNullOrEmpty(Description)) {
          if (!isNullOrEmpty(Reason)) {
            if (!isNullOrEmpty(Time)) {
              if (!isNullOrEmpty(Date)) {
                if (!isNullOrEmpty(Status)) {
                  let UserAccountIDExist = false;
                  async.series([UserAccountIDCheck], function (error, response) {
                    if (UserAccountIDExist == true) {
                      AddSupportTicket(UserAccountID, Title, Description, Reason, Time, Date, Status, function (response) {
                        res.send(response);
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
                    StatusMissing: true
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
              ReasonMissing: true
            });
          }
        } else {
          res.send({
            DescriptionMissing: true
          });
        }
      } else {
        res.send({
          TitleMissing: true
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
  app.get('/Api/v1/SupportTicket/Update/SupportTicketID/:SupportTicketID/UserAccountID/:UserAccountID/Title/:Title/Description/:Description/Reason/:Reason/Time/:Time/Date/:Date/Status/:Status', function (req, res) {
    // USAGE /Api/v1/SupportTicket/Update/SupportTicketID/1/UserAccountID/89a5b95d-8d5d-455b-8139-8e8317fdd392/Title/Title/Description/Description/Reason/Reason2/Time/12:34:56/Date/2009-05-31/Status/Status
    let SupportTicketID = req.params.SupportTicketID;
    let UserAccountID = req.params.UserAccountID;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Reason = req.params.Reason;
    let Time = req.params.Time;
    let Date = req.params.Date;
    let Status = req.params.Status;
  
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Title)) {
        if (!isNullOrEmpty(Description)) {
          if (!isNullOrEmpty(Reason)) {
            if (!isNullOrEmpty(Time)) {
              if (!isNullOrEmpty(Status)) {
                let UserAccountIDExist = false;
                let SupportTicketIDExist = false;
                async.series([SupportTicketIDCheck, UserAccountIDCheck], function (error, response) {
                  if (UserAccountIDExist == true) {
                    if (SupportTicketIDExist == true) {
                      SupportTicketUpdate(SupportTicketID, UserAccountID, Title, Description, Reason, Time, Date, Status, function (response) {
                        if (!isNullOrEmpty(response) && response != undefined) {
                          res.send(response);
                        } else {
                          res.send({
                            SupportTicketUpdateFailed: true
                          });
                        }
                      });
                    } else {
                      res.send({
                        SupportTicketIDExist: false
                      });
                    }
                  } else {
                    res.send({
                      UserAccountIDExist: false
                    });
                  }
                });
  
                function SupportTicketIDCheck(callback) {
                  isSupportTicketIDExist(SupportTicketID, function (response) {
                    console.log('1');
                    let obj = response;
                    if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].SupportTicketID == SupportTicketID) {
                      SupportTicketIDExist = true;
                      callback(null, '1');
                    } else {
                      SupportTicketIDExist = false;
                      callback(null, '1');
                    }
                  });
                }
  
                function UserAccountIDCheck(callback2) {
                  isUserAccountIDExist(UserAccountID, function (response) {
                    console.log('2');
                    let obj = response;
                    if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].UserAccountID == UserAccountID) {
                      UserAccountIDExist = true;
                      callback2(null, '2');
                    } else {
                      UserAccountIDExist = false;
                      callback2(null, '2');
                    }
                  });
                }
              } else {
                res.send({
                  StatusMissing: true
                });
              }
            } else {
              res.send({
                TimeMissing: true
              });
            }
          } else {
            res.send({
              ReasonMissing: true
            });
          }
        } else {
          res.send({
            DescriptionMissing: true
          });
        }
      } else {
        res.send({
          TitleMissing: true
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
  app.get('/Api/v1/SupportTicket/UserAccountID/:UserAccountID/Status/:Status', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Status)) {
        SupportTicketUserAccountIDByStatus(UserAccountID, Status, function (response) {
          if (response != undefined) {
            res.send(beautify(response, null, 2, 100));
          } else {
            res.send({
              SupportTicketUserAccountIDByStatusFailed: true
            });
          }
        });
      } else {
        res.send({
          InvalidStatusType: true
        });
      }
    } else {
      res.send({
        InvalidUserAccountID: true
      });
    }
  });
}

module.exports = function (app) {
  app.get('/UserAccount/SupportTicket', function (req, res) {
    // USAGE /UserAccount/SupportTicket?UserAccountID=bddbe7d1-d28b-4bb6-8b51-eb2d9252c9bb
    // USAGE /UserAccount/SupportTicket?UserAccountID=bddbe7d1-d28b-4bb6-8b51-eb2d9252c9bb&Status=Pending
    let UserAccountID = req.query.UserAccountID;
    let Status = req.query.Status;
    if (!isNullOrEmpty(UserAccountID) && isNullOrEmpty(Status)) {
      Models.SupportTicket.sync();
      let result = Models.SupportTicket.findAll({
        where: {
          UserAccountID: UserAccountID //not null
  
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
    if (!isNullOrEmpty(UserAccountID) && !isNullOrEmpty(Status)) {
      Models.SupportTicket.sync();
      let result = Models.SupportTicket.findAll({
        where: {
          UserAccountID: UserAccountID,
          Status: Status //not null
  
        }
      }).then(function (result) {
        let Data = result.map(function (item) {
          return item;
  
        });
        res.send(beautify(Data, null, 2, 100));
      }).catch(function (result) { //catching any then errors
  
        res.send("Error " + result);
      });
    } else {
      let Data = {
        IsInvalidUserAccountID: true
      }
      res.send(Data);
    }
  });
}

module.exports = function (app) {
  app.get('/Api/v1/SupportTicket/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.SupportTicket.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.SupportTicket.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
  
  app.get('/Api/v1/SupportTicket/Clear', function (req, res) {
    Models.SupportTicket.destroy({
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
  app.get('/Api/v1/SupportTicket/Delete', function (req, res) {
    Models.SupportTicket.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors
  
      res.send("Error " + result);
    });
  });
}
