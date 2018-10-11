let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let DepositHistoryModel = require("./DepositHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var async = require("async");
var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
  //approved deposit
  app.get('/Api/v1/DepositHistory/Approved/UserTransactionID/:UserTransactionID/UserAccountID/:UserAccountID/', function (req, res) {
    let UserTransactionID = req.params.UserTransactionID;
    let UserAccountID = req.params.UserAccountID;

    if (!isNullOrEmpty(UserTransactionID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        DepositHistoryModel.isTransactionExist(UserTransactionID,function(response){
          if(response!=undefined){
            DepositHistoryModel.TransactionStatus(UserTransactionID,function(response){
            
              if(response[0].TransactionStatus=="pending"){
                console.log("it is pending");

                if(response!=undefined){
                  DepositHistoryModel.DepositHistoryUpdateApproved(UserTransactionID, UserAccountID, function (response) {//approve transaction
                    res.send(response);
                    if (response==true) {
                      let status = 200;
                      res.status(status).end(http.STATUS_CODES[status]);
                    } else {
                      res.send({
                        DepositHistoryUpdateApprovedFailed: true
                      });
                    }
                  });
                  
                }else{
                  res.send({
                    DepositHistoryPlayerMoneyFailed: true
                  });
                }
                

              }else{
                res.send({
                  AlreadyApproved: true
                });
              }
            });
          }else{
            res.send({
              UserTransactionDoesNotExist: true
            });
          }
        });
      }else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        UserTransactionIDMissing: true
      });
    }
  });

  //archived deposit
  app.get('/Api/v1/DepositHistory/Archived/UserTransactionID/:UserTransactionID', function (req, res) {
    let UserTransactionID = req.params.UserTransactionID;
    if (!isNullOrEmpty(UserTransactionID)) {
      DepositHistoryModel.DepositHistoryUpdateArchived(UserTransactionID, function (response) {
        if (response != undefined) {
          res.send(response);
        } else {
          res.send({
            DepositHistoryUpdateArchivedFailed: true
          });
        }
      });
    } else {
      res.send({
        UserTransactionIDMissing: true
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
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
              if (response == true) {
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
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
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
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
              if (response == true) {
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
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
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

  app.get('/Api/v1/DepositHistory/Add/UserAccountID/:UserAccountID/Amount/:Amount/AccountHolder/:AccountHolder', function (req, res) {
    // Usage /Api/v1/DepositHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Amount/0/BankNameUsed/BankNameUsed/SecurityCodeUsed/SecurityCodeUsed/Status/Processing/RequestedDATE/2018-06-26/ApprovedDATE/2018-06-26/RejectedDATE/2018-06-26/ProcessingDATE/2018-06-26/RequestedTIME/01:59:17/ApprovedTIME/01:59:17/RejectedTIME/01:59:17/ProcessingTIME/01:59:17
    //       /Api/v1/DepositHistory/Add/UserAccountID/:UserAccountID/Amount/:Amount
    let UserAccountID = req.params.UserAccountID;
    let Amount = req.params.Amount;
    let AccountHolder = req.params.AccountHolder;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Amount)) {
        if(!isNullOrEmpty(AccountHolder)){
          if (Amount > 0) {

              let isUserAccountIDFound = false;
              
              async.series([IsUserAccountIDExistCheck], function (error, response) {
                if (isUserAccountIDFound == true) {

                  let UserTransactionID = uuidv4();

                  DepositHistoryModel.AddDepositHistory(UserAccountID, UserTransactionID, Amount, AccountHolder, function (response) {
                    if (response) {
                      var status = 200;
                      res.status(status).end(http.STATUS_CODES[status]);
                    } else {
                      res.send({
                        AddDepositFailed: true
                      });
                    }
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
              AmountInvalidValue: true
            });
          }
        }else {
          res.send({
            AccountHolderMissing: true
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
}
