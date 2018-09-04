let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let DepositHistoryModel = require("./DepositHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var async = require("async");
module.exports = function (app) {
  app.get('/Api/v1/DepositHistory/Update/DepositHistoryID/:DepositHistoryID/UserAccountID/:UserAccountID/Status/Approved/ApprovedDATE/:ApprovedDATE/ApprovedTIME/:ApprovedTIME/', function (req, res) {
    let DepositHistoryID = req.params.DepositHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let ApprovedDATE = req.params.ApprovedDATE;
    let ApprovedTIME = req.params.ApprovedTIME;
    if (!isNullOrEmpty(DepositHistoryID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(ApprovedDATE)) {
          if (!isNullOrEmpty(ApprovedTIME)) {
            DepositHistoryModel.DepositHistoryUpdateApproved(UserAccountID, DepositHistoryID, ApprovedDATE, ApprovedTIME, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  DepositHistoryUpdateApprovedFailed: true
                });
              }
            });
          } else {
            res.send({
              ApprovedTIMEMissing: true
            });
          }
        } else {
          res.send({
            ApprovedDATEMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        DepositHistoryIDMissing: true
      });
    }
  });
  app.get('/Api/v1/DepositHistory/Update/DepositHistoryID/:DepositHistoryID/UserAccountID/:UserAccountID/Status/Processing/ProcessingDATE/:ProcessingDATE/ProcessingTIME/:ProcessingTIME/', function (req, res) {
    let DepositHistoryID = req.params.DepositHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let ProcessingDATE = req.params.ProcessingDATE;
    let ProcessingTIME = req.params.ProcessingTIME;
    if (!isNullOrEmpty(DepositHistoryID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(ProcessingDATE)) {
          if (!isNullOrEmpty(ProcessingTIME)) {
            DepositHistoryModel.DepositHistoryUpdateProcessing(UserAccountID, DepositHistoryID, ProcessingDATE, ProcessingTIME, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  DepositHistoryUpdateProcessingFailed: true
                });
              }
            });
          } else {
            res.send({
              ProcessingTIMEMissing: true
            });
          }
        } else {
          res.send({
            ProcessingDATEMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        DepositHistoryIDMissing: true
      });
    }
  });
  app.get('/Api/v1/DepositHistory/Update/DepositHistoryID/:DepositHistoryID/UserAccountID/:UserAccountID/Status/Rejected/RejectedDATE/:RejectedDATE/RejectedTIME/:RejectedTIME/', function (req, res) {
    let DepositHistoryID = req.params.DepositHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let RejectedDATE = req.params.RejectedDATE;
    let RejectedTIME = req.params.RejectedTIME;
    if (!isNullOrEmpty(DepositHistoryID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(RejectedDATE)) {
          if (!isNullOrEmpty(RejectedTIME)) {
            DepositHistoryModel.DepositHistoryUpdateRejected(UserAccountID, DepositHistoryID, RejectedDATE, RejectedTIME, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  DepositHistoryUpdateRejectedFailed: true
                });
              }
            });
          } else {
            res.send({
              RejectedTIMEMissing: true
            });
          }
        } else {
          res.send({
            RejectedDATEMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        DepositHistoryIDMissing: true
      });
    }
  });
  app.get('/Api/v1/DepositHistory/Update/DepositHistoryID/:DepositHistoryID/UserAccountID/:UserAccountID/Amount/:Amount/BankNameUsed/:BankNameUsed/SecurityCodeUsed/:SecurityCodeUsed/Status/:Status/RequestedDATE/:RequestedDATE/ApprovedDATE/:ApprovedDATE/RejectedDATE/:RejectedDATE/ProcessingDATE/:ProcessingDATE/RequestedTIME/:RequestedTIME/ApprovedTIME/:ApprovedTIME/RejectedTIME/:RejectedTIME/ProcessingTIME/:ProcessingTIME', function (req, res) {
    let DepositHistoryID = req.params.DepositHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let Amount = req.params.Amount;
    let BankNameUsed = req.params.BankNameUsed;
    let SecurityCodeUsed = req.params.SecurityCodeUsed;
    let Status = req.params.Status;
    let RequestedDATE = req.params.RequestedDATE;
    let ApprovedDATE = req.params.ApprovedDATE;
    let RejectedDATE = req.params.RejectedDATE;
    let ProcessingDATE = req.params.ProcessingDATE;
    let RequestedTIME = req.params.RequestedTIME;
    let ApprovedTIME = req.params.ApprovedTIME;
    let RejectedTIME = req.params.RejectedTIME;
    let ProcessingTIME = req.params.ProcessingTIME;
    if (!isNullOrEmpty(DepositHistoryID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(Amount)) {
          if (!isNullOrEmpty(BankNameUsed)) {
            if (!isNullOrEmpty(SecurityCodeUsed)) {
              if (!isNullOrEmpty(Status)) {
                let RequestedDATEParsed = moment(RequestedDATE, "YYYY-MM-DD");
                let isValidRequestedDATEParsed = RequestedDATEParsed.isValid();
                if (!isNullOrEmpty(RequestedDATE) && isValidRequestedDATEParsed == true) {
                  let ApprovedDATEParsed = moment(ApprovedDATE, "YYYY-MM-DD");
                  let isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();
                  if (!isNullOrEmpty(ApprovedDATE) && isValidApprovedDATEParsed == true) {
                    let RejectedDATEParsed = moment(RejectedDATE, "YYYY-MM-DD");
                    let isValidRejectedDATEParsed = RejectedDATEParsed.isValid();
                    if (!isNullOrEmpty(RejectedDATE) && isValidRejectedDATEParsed == true) {
                      let ProcessingDATEParsed = moment(ProcessingDATE, "YYYY-MM-DD");
                      let isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();
                      if (!isNullOrEmpty(ProcessingDATE) && isValidProcessingDATEParsed == true) {
                        if (!isNullOrEmpty(RequestedTIME)) {
                          if (!isNullOrEmpty(ApprovedTIME)) {
                            if (!isNullOrEmpty(RejectedTIME)) {
                              if (!isNullOrEmpty(ProcessingTIME)) {

                                let UserAccountIDFound = false;
                                let DepositHistoryIDFound = false;
                                async.series([IsUserAccountIDExistCheck, IsDepositHistoryIDExistCheck], function (error, response) {
                                  if (Status == "Approved" || Status == "Pending" || Status == "Rejected") {
                                    if (DepositHistoryIDFound == true) {

                                      if (UserAccountIDFound == true) {

                                        Models.DepositHistory.update({
                                            UserAccountID: UserAccountID,
                                            Amount: Amount,
                                            BankNameUsed: BankNameUsed,
                                            SecurityCodeUsed: SecurityCodeUsed,
                                            Status: Status,
                                            RequestedDATE: RequestedDATE,
                                            ApprovedDATE: ApprovedDATE,
                                            RejectedDATE: RejectedDATE,
                                            ProcessingDATE: ProcessingDATE,
                                            RequestedTIME: RequestedTIME,
                                            ApprovedTIME: ApprovedTIME,
                                            RejectedTIME: RejectedTIME,
                                            ProcessingTIME: ProcessingTIME,
                                          }, {
                                            where: {
                                              DepositHistoryID: DepositHistoryID
                                            }
                                          })
                                          .then(Success => {
                                            res.send("Updated");
                                          })

                                          .catch(error => {

                                            console.log("Error Updating");
                                            res.send("Error Updating " + error);
                                          });


                                        res.send({
                                          Success: true
                                        });
                                      } else {
                                        res.send({});
                                      }
                                    } else {
                                      res.send({
                                        DepositHistoryIDInvalidValue: true
                                      });
                                    }
                                  } else {
                                    res.send({
                                      StatusInvalidValue: true
                                    });
                                  }
                                });

                                function IsUserAccountIDExistCheck(callback) {
                                  DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                                    if (response != undefined) {
                                      UserAccountIDFound = true;
                                      callback(null, '1');
                                    } else {
                                      UserAccountIDFound = false;
                                      callback(null, '1');
                                    }
                                  });
                                }

                                function IsDepositHistoryIDExistCheck(callback) {
                                  DepositHistoryModel.DepositHistoryIDUserAccountID(UserAccountID, DepositHistoryID, function (response) {
                                    if (response != undefined) {
                                      DepositHistoryIDFound = true;
                                      callback(null, '2');
                                    } else {
                                      DepositHistoryIDFound = false;
                                      callback(null, '2');
                                    }
                                  });
                                }
                              } else {
                                res.send({
                                  ProcessingTIMEMissing: true
                                });
                              }
                            } else {
                              res.send({
                                RejectedTIMEMissing: true
                              });
                            }
                          } else {
                            res.send({
                              ApprovedTIMEMissing: true
                            });
                          }
                        } else {
                          res.send({
                            RequestedTIMEMissing: true
                          });
                        }
                      } else {
                        res.send({
                          ProcessingDATEMissing: true
                        });
                      }
                    } else {
                      res.send({
                        RejectedDATEMissing: true
                      });
                    }
                  } else {
                    res.send({
                      ApprovedDATEMissing: true
                    });
                  }
                } else {
                  res.send({
                    RequestedDATEMissing: true
                  });
                }
              } else {
                res.send({
                  StatusMissing: true
                });
              }
            } else {
              res.send({
                SecurityCodeUsedMissing: true
              });
            }
          } else {
            res.send({
              BankNameUsedMissing: true
            });
          }
        } else {
          res.send({
            AmountMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        DepositHistoryIDMissing: true
      });
    }
  });
  app.get('/Api/v1/DepositHistory/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset = req.query.Offset;
    let Limit = req.query.Limit;
    let Sort = req.query.Sort;
    Models.DepositHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if (isNullOrEmpty(Offset) && isNullOrEmpty(Limit) && isNullOrEmpty(Sort)) {
      Models.DepositHistory.sync();
      let result = Models.DepositHistory.findAll({
        where: {
          DepositHistoryID: {
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
    //res.send("DepositHistory "+Offset+" "+ Limit+" "+Sort);
  });
  app.get('/Api/v1/DepositHistory/UserAccount/UserAccountID/:UserAccountID/Status/:Status/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status;
    if (Status == "Approved" || Status == "Processing" || Status == "Rejected") {
      let isUserAccountIDFound = false;
      async.series([IsUserAccountIDExistCheck], function (error, response) {
        if (isUserAccountIDFound == true) {
          DepositHistoryModel.DepositHistoryUserAccountIDStatus(UserAccountID, Status, function (response) {
            if (response != undefined) {
              res.send(beautify(response, null, 2, 100));
            } else {
              res.send({});
            }
          });
        } else {
          res.send({
            UserAccountIDFound: false
          });
        }
      });

      function IsUserAccountIDExistCheck(callback) {
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
          if (response != undefined) {
            isUserAccountIDFound = true;
            callback(null, '1');
          } else {
            isUserAccountIDFound = false;
            callback(null, '1');
          }

        });

      }

    } else {
      res.send({
        StatusInvalidValue: true
      });
    }
  });

  app.get('/Api/v1/DepositHistory/Add/UserAccountID/:UserAccountID/Amount/:Amount/BankNameUsed/:BankNameUsed/SecurityCodeUsed/:SecurityCodeUsed/Status/:Status/RequestedDATE/:RequestedDATE/ApprovedDATE/:ApprovedDATE/RejectedDATE/:RejectedDATE/ProcessingDATE/:ProcessingDATE/RequestedTIME/:RequestedTIME/ApprovedTIME/:ApprovedTIME/RejectedTIME/:RejectedTIME/ProcessingTIME/:ProcessingTIME', function (req, res) {
    // Usage /Api/v1/DepositHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Amount/0/BankNameUsed/BankNameUsed/SecurityCodeUsed/SecurityCodeUsed/Status/Processing/RequestedDATE/2018-06-26/ApprovedDATE/2018-06-26/RejectedDATE/2018-06-26/ProcessingDATE/2018-06-26/RequestedTIME/01:59:17/ApprovedTIME/01:59:17/RejectedTIME/01:59:17/ProcessingTIME/01:59:17
    let UserAccountID = req.params.UserAccountID;
    let Amount = req.params.Amount;
    let BankNameUsed = req.params.BankNameUsed;
    let SecurityCodeUsed = req.params.SecurityCodeUsed;
    let Status = req.params.Status;
    let RequestedDATE = req.params.RequestedDATE;
    let ApprovedDATE = req.params.ApprovedDATE;
    let RejectedDATE = req.params.RejectedDATE;
    let ProcessingDATE = req.params.ProcessingDATE;
    let RequestedTIME = req.params.RequestedTIME;
    let ApprovedTIME = req.params.ApprovedTIME;
    let RejectedTIME = req.params.RejectedTIME;
    let ProcessingTIME = req.params.ProcessingTIME;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Amount)) {
        if (!isNullOrEmpty(BankNameUsed)) {
          if (!isNullOrEmpty(SecurityCodeUsed)) {
            if (!isNullOrEmpty(Status)) {
              let RequestedDATEParsed = moment(RequestedDATE, "YYYY-MM-DD");
              let isValidRequestedDATEParsed = RequestedDATEParsed.isValid();

              if (!isNullOrEmpty(RequestedDATE) && isValidRequestedDATEParsed == true && RequestedDATEParsed.year() > 1959) {
                let ApprovedDATEParsed = moment(ApprovedDATE, "YYYY-MM-DD");
                let isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();

                if (!isNullOrEmpty(ApprovedDATE) && isValidApprovedDATEParsed == true && ApprovedDATEParsed.year() > 1959) {
                  let RejectedDATEParsed = moment(RejectedDATE, "YYYY-MM-DD");
                  let isValidRejectedDATEParsed = RejectedDATEParsed.isValid();

                  if (!isNullOrEmpty(RejectedDATE) && isValidRejectedDATEParsed == true && RejectedDATEParsed.year() > 1959) {
                    let ProcessingDATEParsed = moment(ProcessingDATE, "YYYY-MM-DD");
                    let isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();

                    if (!isNullOrEmpty(ProcessingDATE) && isValidProcessingDATEParsed == true && ProcessingDATEParsed.year() > 1959) {

                      if (!isNullOrEmpty(RequestedTIME)) {
                        if (!isNullOrEmpty(ApprovedTIME)) {
                          if (!isNullOrEmpty(RejectedTIME)) {
                            if (!isNullOrEmpty(ProcessingTIME)) {

                              if (Amount > 0) {
                                if (Status == "Approved" || Status == "Rejected" || Status == "Processing") {
                                  let isUserAccountIDFound = false;

                                  async.series([IsUserAccountIDExistCheck], function (error, response) {
                                    if (isUserAccountIDFound == true) {

                                      DepositHistoryModel.AddDepositHistory(UserAccountID, Amount, BankNameUsed, SecurityCodeUsed, Status, RequestedDATE, ApprovedDATE, RejectedDATE, ProcessingDATE, RequestedTIME, ApprovedTIME, RejectedTIME, ProcessingTIME, function (response) {
                                        res.send(response);
                                      });

                                    } else {
                                      res.send({
                                        IsUserAccountIDExist: false
                                      });
                                    }
                                  });

                                  function IsUserAccountIDExistCheck(callback) {
                                    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                                      if (response != undefined) {
                                        isUserAccountIDFound = true;
                                        callback(null, '1');
                                      } else {
                                        isUserAccountIDFound = false;
                                        callback(null, '1');
                                      }
                                    });
                                  }

                                } else {
                                  res.send({
                                    StatusInvalidValue: true
                                  });
                                }
                              } else {
                                res.send({
                                  AmountInvalidValue: true
                                });
                              }
                            } else {
                              res.send({
                                ProcessingTIMEMissing: true
                              });
                            }
                          } else {
                            res.send({
                              RejectedTIMEMissing: true
                            });
                          }
                        } else {
                          res.send({
                            ApprovedTIMEMissing: true
                          });
                        }
                      } else {
                        res.send({
                          RequestedTIMEMissing: true
                        });
                      }
                    } else {
                      res.send({
                        ProcessingDATEMissing: true
                      });
                    }
                  } else {
                    res.send({
                      RejectedDATEMissing: true
                    });
                  }
                } else {
                  res.send({
                    ApprovedDATEMissing: true
                  });
                }
              } else {
                res.send({
                  RequestedDATEMissing: true
                });
              }
            } else {
              res.send({
                StatusMissing: true
              });
            }
          } else {
            res.send({
              SecurityCodeUsedMissing: true
            });
          }
        } else {
          res.send({
            BankNameUsed: true
          });
        }
      } else {
        res.send({
          AmountMissing: true
        })
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });

  app.get('/Api/v1/DepositHistory/Add/UserAccountID/:UserAccountID/Amount/:Amount/BankNameUsed/:BankNameUsed/SecurityCodeUsed/:SecurityCodeUsed/', function (req, res) {
    // Usage /Api/v1/DepositHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Amount/0/BankNameUsed/BankNameUsed/SecurityCodeUsed/SecurityCodeUsed/
   
    async.series([], function (error, response) {
        DepositHistoryModel.AddDepositHistoryRequest(UserAccountID, Amount, BankNameUsed, SecurityCodeUsed, Status, function (response) {
          res.send(response);
        });
    });
   
    /* let UserAccountID = req.params.UserAccountID;
    let Amount = req.params.Amount;
    let BankNameUsed = req.params.BankNameUsed;
    let SecurityCodeUsed = req.params.SecurityCodeUsed;
    let Status = req.params.Status;
    let RequestedDATE = req.params.RequestedDATE;
    let ApprovedDATE = req.params.ApprovedDATE;
    let RejectedDATE = req.params.RejectedDATE;
    let ProcessingDATE = req.params.ProcessingDATE;
    let RequestedTIME = req.params.RequestedTIME;
    let ApprovedTIME = req.params.ApprovedTIME;
    let RejectedTIME = req.params.RejectedTIME;
    let ProcessingTIME = req.params.ProcessingTIME;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Amount)) {
        if (!isNullOrEmpty(BankNameUsed)) {
          if (!isNullOrEmpty(SecurityCodeUsed)) {
            if (!isNullOrEmpty(Status)) {
              let RequestedDATEParsed = moment(RequestedDATE, "YYYY-MM-DD");
              let isValidRequestedDATEParsed = RequestedDATEParsed.isValid();
  
              if (!isNullOrEmpty(RequestedDATE) && isValidRequestedDATEParsed == true && RequestedDATEParsed.year() > 1959) {
                let ApprovedDATEParsed = moment(ApprovedDATE, "YYYY-MM-DD");
                let isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();
  
                if (!isNullOrEmpty(ApprovedDATE) && isValidApprovedDATEParsed == true && ApprovedDATEParsed.year() > 1959) {
                  let RejectedDATEParsed = moment(RejectedDATE, "YYYY-MM-DD");
                  let isValidRejectedDATEParsed = RejectedDATEParsed.isValid();
  
                  if (!isNullOrEmpty(RejectedDATE) && isValidRejectedDATEParsed == true && RejectedDATEParsed.year() > 1959) {
                    let ProcessingDATEParsed = moment(ProcessingDATE, "YYYY-MM-DD");
                    let isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();
  
                    if (!isNullOrEmpty(ProcessingDATE) && isValidProcessingDATEParsed == true && ProcessingDATEParsed.year() > 1959) {
  
                      if (!isNullOrEmpty(RequestedTIME)) {
                        if (!isNullOrEmpty(ApprovedTIME)) {
                          if (!isNullOrEmpty(RejectedTIME)) {
                            if (!isNullOrEmpty(ProcessingTIME)) {
  
                              if (Amount > 0) {
                                if (Status == "Approved" || Status == "Rejected" || Status == "Processing") {
                                  let isUserAccountIDFound = false;
  
                                  
  
                                  function IsUserAccountIDExistCheck(callback) {
                                    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                                      if (response != undefined) {
                                        isUserAccountIDFound = true;
                                        callback(null, '1');
                                      } else {
                                        isUserAccountIDFound = false;
                                        callback(null, '1');
                                      }
                                    });
                                  }
  
                                } else {
                                  res.send({
                                    StatusInvalidValue: true
                                  });
                                }
                              } else {
                                res.send({
                                  AmountInvalidValue: true
                                });
                              }
                            } else {
                              res.send({
                                ProcessingTIMEMissing: true
                              });
                            }
                          } else {
                            res.send({
                              RejectedTIMEMissing: true
                            });
                          }
                        } else {
                          res.send({
                            ApprovedTIMEMissing: true
                          });
                        }
                      } else {
                        res.send({
                          RequestedTIMEMissing: true
                        });
                      }
                    } else {
                      res.send({
                        ProcessingDATEMissing: true
                      });
                    }
                  } else {
                    res.send({
                      RejectedDATEMissing: true
                    });
                  }
                } else {
                  res.send({
                    ApprovedDATEMissing: true
                  });
                }
              } else {
                res.send({
                  RequestedDATEMissing: true
                });
              }
            } else {
              res.send({
                StatusMissing: true
              });
            }
          } else {
            res.send({
              SecurityCodeUsedMissing: true
            });
          }
        } else {
          res.send({
            BankNameUsed: true
          });
        }
      } else {
        res.send({
          AmountMissing: true
        })
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }*/
  });
app.get('/Api/v1/DepositHistory/Add/UserAccountID/:UserAccountID/Amount/:Amount/BankNameUsed/:BankNameUsed/SecurityCodeUsed/:SecurityCodeUsed/Status/:Status/RequestedDATE/:RequestedDATE/ApprovedDATE/:ApprovedDATE/RejectedDATE/:RejectedDATE/ProcessingDATE/:ProcessingDATE/RequestedTIME/:RequestedTIME/ApprovedTIME/:ApprovedTIME/RejectedTIME/:RejectedTIME/ProcessingTIME/:ProcessingTIME', function (req, res) {
  // Usage /Api/v1/DepositHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Amount/0/BankNameUsed/BankNameUsed/SecurityCodeUsed/SecurityCodeUsed/Status/Processing/RequestedDATE/2018-06-26/ApprovedDATE/2018-06-26/RejectedDATE/2018-06-26/ProcessingDATE/2018-06-26/RequestedTIME/01:59:17/ApprovedTIME/01:59:17/RejectedTIME/01:59:17/ProcessingTIME/01:59:17
  let UserAccountID = req.params.UserAccountID;
  let Amount = req.params.Amount;
  let BankNameUsed = req.params.BankNameUsed;
  let SecurityCodeUsed = req.params.SecurityCodeUsed;
  let Status = req.params.Status;
  let RequestedDATE = req.params.RequestedDATE;
  let ApprovedDATE = req.params.ApprovedDATE;
  let RejectedDATE = req.params.RejectedDATE;
  let ProcessingDATE = req.params.ProcessingDATE;
  let RequestedTIME = req.params.RequestedTIME;
  let ApprovedTIME = req.params.ApprovedTIME;
  let RejectedTIME = req.params.RejectedTIME;
  let ProcessingTIME = req.params.ProcessingTIME;
  if (!isNullOrEmpty(UserAccountID)) {
    if (!isNullOrEmpty(Amount)) {
      if (!isNullOrEmpty(BankNameUsed)) {
        if (!isNullOrEmpty(SecurityCodeUsed)) {
          if (!isNullOrEmpty(Status)) {
            let RequestedDATEParsed = moment(RequestedDATE, "YYYY-MM-DD");
            let isValidRequestedDATEParsed = RequestedDATEParsed.isValid();

            if (!isNullOrEmpty(RequestedDATE) && isValidRequestedDATEParsed == true && RequestedDATEParsed.year() > 1959) {
              let ApprovedDATEParsed = moment(ApprovedDATE, "YYYY-MM-DD");
              let isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();

              if (!isNullOrEmpty(ApprovedDATE) && isValidApprovedDATEParsed == true && ApprovedDATEParsed.year() > 1959) {
                let RejectedDATEParsed = moment(RejectedDATE, "YYYY-MM-DD");
                let isValidRejectedDATEParsed = RejectedDATEParsed.isValid();

                if (!isNullOrEmpty(RejectedDATE) && isValidRejectedDATEParsed == true && RejectedDATEParsed.year() > 1959) {
                  let ProcessingDATEParsed = moment(ProcessingDATE, "YYYY-MM-DD");
                  let isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();

                  if (!isNullOrEmpty(ProcessingDATE) && isValidProcessingDATEParsed == true && ProcessingDATEParsed.year() > 1959) {

                    if (!isNullOrEmpty(RequestedTIME)) {
                      if (!isNullOrEmpty(ApprovedTIME)) {
                        if (!isNullOrEmpty(RejectedTIME)) {
                          if (!isNullOrEmpty(ProcessingTIME)) {

                            if (Amount > 0) {
                              if (Status == "Approved" || Status == "Rejected" || Status == "Processing") {
                                let isUserAccountIDFound = false;

                                async.series([IsUserAccountIDExistCheck], function (error, response) {
                                  if (isUserAccountIDFound == true) {

                                    DepositHistoryModel.AddDepositHistory(UserAccountID, Amount, BankNameUsed, SecurityCodeUsed, Status, RequestedDATE, ApprovedDATE, RejectedDATE, ProcessingDATE, RequestedTIME, ApprovedTIME, RejectedTIME, ProcessingTIME, function (response) {
                                      res.send(response);
                                    });

                                  } else {
                                    res.send({
                                      IsUserAccountIDExist: false
                                    });
                                  }
                                });

                                function IsUserAccountIDExistCheck(callback) {
                                  DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                                    if (response != undefined) {
                                      isUserAccountIDFound = true;
                                      callback(null, '1');
                                    } else {
                                      isUserAccountIDFound = false;
                                      callback(null, '1');
                                    }
                                  });
                                }

                              } else {
                                res.send({
                                  StatusInvalidValue: true
                                });
                              }
                            } else {
                              res.send({
                                AmountInvalidValue: true
                              });
                            }
                          } else {
                            res.send({
                              ProcessingTIMEMissing: true
                            });
                          }
                        } else {
                          res.send({
                            RejectedTIMEMissing: true
                          });
                        }
                      } else {
                        res.send({
                          ApprovedTIMEMissing: true
                        });
                      }
                    } else {
                      res.send({
                        RequestedTIMEMissing: true
                      });
                    }
                  } else {
                    res.send({
                      ProcessingDATEMissing: true
                    });
                  }
                } else {
                  res.send({
                    RejectedDATEMissing: true
                  });
                }
              } else {
                res.send({
                  ApprovedDATEMissing: true
                });
              }
            } else {
              res.send({
                RequestedDATEMissing: true
              });
            }
          } else {
            res.send({
              StatusMissing: true
            });
          }
        } else {
          res.send({
            SecurityCodeUsedMissing: true
          });
        }
      } else {
        res.send({
          BankNameUsed: true
        });
      }
    } else {
      res.send({
        AmountMissing: true
      })
    }
  } else {
    res.send({
      UserAccountIDMissing: true
    });
  }
});
  app.get('/Api/v1/DepositHistory/Clear', function (req, res) {
    Models.DepositHistory.destroy({
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
  app.get('/Api/v1/DepositHistory/Delete', function (req, res) {
    Models.DepositHistory.sync({
      force: true
    }).then(function (result) {
      res.send("Deleted");
    }).catch(function (result) { //catching any then errors
  
      res.send("Error " + result);
    });
  });
  
  app.get('/Api/v1/DepositHistory/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.DepositHistory.sync( /*{alter:true}*/ ); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.DepositHistory.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}
