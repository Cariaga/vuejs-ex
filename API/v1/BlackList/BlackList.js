let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let BlackListModel = require("../BlackList/BlackListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {
  //SELECTION
  app.get('/Api/v1/BlackList/Limit/:Limit/Offset/:Offset/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    if (!isNullOrEmpty(Limit) && !isNullOrEmpty(Offset)) {
      BlackListModel.BlackList(Limit, Offset, function (response) {
        res.send(response);
      });
    } else if (isNullOrEmpty(Limit) && isNullOrEmpty(Offset)) {
      BlackListModel.BlackList(undefined, undefined, function (response) {
        res.send(response);
      });
    }
  });
  //MODIFY
 /* app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/Title/:Title/Description/:Description/ReportDate/:ReportDate/ReleaseDate/:ReleaseDate/', function (req, res) {
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
  });*/
  app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/', function (req, res) {
    let BlackListID = req.params.BlackListID;
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status; //status to set
    if (!isNullOrEmpty(BlackListID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(Status)) {
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
  //INSERT
  app.get('/Api/v1/BlackList/Add/UserAccountID/:UserAccountID/Title/:Title/Status/:Status/Reason/:Reason/', function (req, res) { //OK
    let UserAccountID = req.params.UserAccountID;
    let Title = req.params.Title;
    let Status = req.params.Status;
    let Reason = req.params.Reason;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Title)) {
        if (!isNullOrEmpty(Status)) {
          if (!isNullOrEmpty(Reason)) {
                BlackListModel.AddBlackList(UserAccountID, Title, Status, Reason, function (response) {
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

  app.get('/Api/v1/BlackList/Search/Column/:Column/Value/:Value', function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;

    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        BlackListModel.BlacklistSearch(Column, Value, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            res.send(undefined);
          }
        });
      } else {
        res.send({
          InvalidValue: true
        });
      }
    } else {
      res.send({
        InvalidColumn: true
      });
    }
  });
  app.get('/Api/v1/BlackList/Check/Blocked/UserAccountID/:UserAccountID/', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Value = req.params.Value;

    if (!isNullOrEmpty(UserAccountID)) {
        DBCheck.isUserAccountBlocked(UserAccountID, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            res.send(undefined);
          }
        });
    } else {
      res.send({
        InvalidColumn: true
      });
    }
  });
}