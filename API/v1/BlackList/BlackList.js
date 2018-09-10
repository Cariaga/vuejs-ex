let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let BlackListModel = require("./BlackListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {//MODIFY
  app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/Title/:Title/Description/:Description/ReportDate/:ReportDate/ReleaseDate/:ReleaseDate/', function (req, res) {
    let BlackListID = req.params.BlackListID;
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let ReportDate = req.params.ReportDate;
    let ReleaseDate = req.params.ReleaseDate;
    if (!isNullOrEmpty(BlackListID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(Status)) {
          if (!isNullOrEmpty(Title)) {
            if (!isNullOrEmpty(Description)) {
              if (!isNullOrEmpty(ReportDate)) {
                if (!isNullOrEmpty(ReleaseDate)) {
                  BlackListModel.BlackListUpdate(BlackListID, UserAccountID, Status, Title, Description, ReportDate, ReleaseDate, function (response) {
                    if (response != undefined) {
                      res.send(response);
                    } else {
                      res.send({
                        BlackListUpdateFailed: true
                      });
                    }
                  });
                } else {
                  res.send({
                    ReleaseDateMissing: true
                  });
                }
              } else {
                res.send({
                  ReportDateMissing: true
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
            StatusMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        BlackListIDMissing: true
      });
    }
  });
  app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/', function (req, res) {
    let BlackListID = req.params.BlackListID;
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status; //status to set
    if (!isNullOrEmpty(BlackListID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(Status)) {
          let AccountStatus = undefined; //status retrived
          let UserAccountIDExist = false;
          let FoundBlackListID = undefined; //used to check if it matches the BlackListID params

          BlackListModel.BlackListStatusUpdate(BlackListID, UserAccountID, Status, function (response) {
            console.log("Status Set");
            if (response != undefined) {
              res.send(response);
            } else {
              res.send({
                BlackListStatusUpdateFailed: true
              });
            }
          });


          function UserAccountIDCheck(callback) {
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
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

          function IsAccountBlockedCheck(callback) {
            DBCheck.isUserAccountBlocked(UserAccountID, function (response) {
              let obj = response;
              if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].UserAccountID == UserAccountID) {
                console.log('IsAccountBlockedCheck');
                FoundBlackListID = obj[0].BlackListID; //matching Blacklist ID
                AccountStatus = obj[0].Status;
                callback(null, '1');
              } else {
                AccountStatus = undefined;
                callback(null, '1');
              }
            });
          }
        } else {
          res.send("Missing Status " + Status);
        }
      } else {
        res.send("Missing UserAccountID " + UserAccountID);
      }
    } else {
      res.send("Missing BlackListID " + BlackListID);
    }
  });
  app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/Title/:Title/Description/:Description/ReportDate/:ReportDate/ReleaseDate/:ReleaseDate/', function (req, res) {
    let BlackListID = req.params.BlackListID;
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let ReportDate = req.params.ReportDate;
    let ReleaseDate = req.params.ReleaseDate;

    if (!isNullOrEmpty(BlackListID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(Status)) {
          if (!isNullOrEmpty(Title)) {
            if (!isNullOrEmpty(Description)) {
              if (!isNullOrEmpty(ReportDate)) {
                if (!isNullOrEmpty(ReleaseDate)) {
                  BlackListModel.BlackListUpdate(BlackListID, UserAccountID, Status, Title, Description, ReportDate, ReleaseDate, function (response) {
                    if (response != undefined) {
                      res.send(response);
                    } else {
                      res.send({
                        BlackListUpdateFailed: true
                      });
                    }
                  });
                } else {
                  res.send({
                    ReleaseDateMissing: true
                  });
                }
              } else {
                res.send({
                  ReportDateMissing: true
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
            StatusMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        BlackListIDMissing: true
      });
    }
  });
//INSERT
  app.get('/Api/v1/BlackList/Add/UserAccountID/:UserAccountID/Title/:Title/Status/:Status/Description/:Description/ReportDate/:ReportDate/ReleaseDate/:ReleaseDate/', function (req, res) {//OK
    //USAGE /Api/v1/BlackList/Add/UserAccountID/Title/:Status/Description/2018-06-27/2018-06-27
    let UserAccountID = req.params.UserAccountID;
    let Title = req.params.Title;
    let Status = req.params.Status;
    let Description = req.params.Description;
    let ReportDate = req.params.ReportDate;
    let ReleaseDate = req.params.ReleaseDate;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Title)) {
        if (!isNullOrEmpty(Status)) {
          if (!isNullOrEmpty(Description)) {
            if (!isNullOrEmpty(ReportDate)) {
              if (!isNullOrEmpty(ReleaseDate)) {
                BlackListModel.AddBlackList(UserAccountID, Title, Status, Description, ReportDate, ReleaseDate, function (response) {
                  if (response != undefined) {
                    res.send(response);
                  } else {
                    res.send({
                      AddBlackListFailed: true
                    });
                  }
                });
              } else {
                res.send({
                  ReleaseDateMissing: true
                });
              }
            } else {
              res.send({
                ReportDateMissing: true
              });
            }
          } else {
            res.send({
              DescriptionMissing: true
            });
          }
        } else {
          res.send({
            StatusMissing: true
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
//SELECTION
  app.get('/Api/v1/BlackList/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
   
  });
}
